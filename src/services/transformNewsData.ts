import { PreNewsItem } from '@/types/preNewsData';
import { toast } from '@/hooks/useToast';
import { createDataFromClient, deleteDataByIdFromClient } from '@/services';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem } from '@/types/newsItemTypes';

const fetchHtml = async (url: string) => {
    try {
        const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`;
        const response = await axios.get(proxyUrl);

        const fullHtml = response.data;
        const $ = cheerio.load(fullHtml);
        const bodyContent = $('body').html();

        if (!bodyContent) {
            throw new Error('HTML에서 body 내용을 추출할 수 없습니다.');
        }

        return bodyContent;
    } catch (error) {
        throw new Error(`HTML fetch 실패: ${(error as Error).message}`);
    }
};

const convertPreNewsToNewsItem = async (preNews: PreNewsItem): Promise<NewsItem> => {
    const contents = await fetchHtml(preNews.originallink);

    return {
        news_id: crypto.randomUUID(),
        title: preNews.title,
        contents,
        source: preNews.originallink,
        source_published_at: preNews.pubDate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category_id: preNews.category_id,
        species_id: preNews.species_id,
        img_url: null,
        is_published: false,
        is_sended: false,
        like: 0,
        share: 0,
        summary: preNews.description,
        user_id: null,
    };
};

export const createNewsItems = async (preNewsData: PreNewsItem[]) => {
    const total = preNewsData.length;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < total; i += 1) {
        const preNews = preNewsData[i];

        try {
            // eslint-disable-next-line
            const newsData = await convertPreNewsToNewsItem(preNews);
            // eslint-disable-next-line
            await createDataFromClient('news_items', newsData);

            if (preNews.pre_news_id) {
                // eslint-disable-next-line
                await deleteDataByIdFromClient(
                    'pre_news_items',
                    'pre_news_id',
                    preNews.pre_news_id,
                );
            }

            successCount += 1;

            toast({
                title: '📰 뉴스 저장 완료',
                description: `(${i + 1}/${total}) "${preNews.title || '제목 없음'}" 처리 성공`,
                variant: 'success',
                duration: 3000,
            });
        } catch (err) {
            failCount += 1;

            toast({
                title: '⚠️ 뉴스 저장 실패',
                description: `(${i + 1}/${total}) "${preNews.title || '제목 없음'}" 처리 중 오류 발생`,
                variant: 'error',
                duration: 4000,
            });
        }
    }

    if (failCount === 0) {
        toast({
            title: '🎉 전체 뉴스 저장 완료',
            description: `${total}개 뉴스 항목의 저장이 모두 성공했습니다.`,
            variant: 'success',
        });
    } else {
        toast({
            title: '✅ 뉴스 저장 일부 성공',
            description: `${total}개 중 ${successCount}개 저장 성공, ${failCount}개 실패`,
            variant: 'error',
        });
    }
};
