import axios from 'axios';
import { checkDuplicateData } from '@/services';
import { PreNewsItem } from './usePreNewsItem';

interface RawPreNewsItem {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
}

const cleanText = (str: string) => {
    // 1. <b> 태그 제거
    const withoutBoldTags = str.replace(/<b>/g, '').replace(/<\/b>/g, '');

    // 2. HTML 엔티티 변환
    const textarea = document.createElement('textarea');
    textarea.innerHTML = withoutBoldTags;
    return textarea.value;
};

const determineCategoryAndSpecies = (
    title: string,
    description: string,
    categoryOptions: {
        categoryKeywordMap: Record<string, string[]>;
        categoryMap: Record<string, string>;
    },
    speciesOptions: {
        speciesKeywordMap: Record<string, string[]>;
        speciesMap: Record<string, string>;
    },
) => {
    const matchedCategory = Object.entries(categoryOptions.categoryKeywordMap).find(
        ([_, keywords]) =>
            keywords.some(keyword => title.includes(keyword) || description.includes(keyword)),
    );

    const matchedSpecies = Object.entries(speciesOptions.speciesKeywordMap).find(([_, keywords]) =>
        keywords.some(keyword => title.includes(keyword) || description.includes(keyword)),
    );

    const category = matchedCategory ? categoryOptions.categoryMap[matchedCategory[0]] || '' : '';
    const species = matchedSpecies ? speciesOptions.speciesMap[matchedSpecies[0]] || '' : '';

    return { category, species };
};

export const fetchPreNewsData = async (
    searchWord: string,
    selectedSize: number,
    selectedSort: string,
    categoryOptions: {
        categoryKeywordMap: Record<string, string[]>;
        categoryMap: Record<string, string>;
    },
    speciesOptions: {
        speciesKeywordMap: Record<string, string[]>;
        speciesMap: Record<string, string>;
    },
): Promise<PreNewsItem[]> => {
    const response = await axios.get(`/api/naver-news`, {
        params: {
            query: searchWord,
            sort: selectedSort,
            display: selectedSize,
        },
    });

    const rawData: RawPreNewsItem[] = response.data.items;

    const nonDuplicateData = (
        await Promise.all(
            rawData.map(async item => {
                const isDuplicate = await checkDuplicateData(
                    'pre_news_items',
                    'originallink',
                    item.originallink,
                );
                return isDuplicate ? null : item;
            }),
        )
    ).filter((item): item is RawPreNewsItem => item !== null);

    return nonDuplicateData.map(item => {
        const { category, species } = determineCategoryAndSpecies(
            item.title,
            item.description,
            categoryOptions,
            speciesOptions,
        );

        return {
            ...item,
            title: cleanText(item.title),
            description: cleanText(item.description),
            category,
            species,
            pre_news_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
    });
};
