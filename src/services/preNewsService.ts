import axios from 'axios';
import { checkDuplicateData } from '@/services';
import { InsertPreNewsItem, RawPreNewsItem } from '@/types/preNewsData';
import { cleanText } from '@/utils/cleanText';
import { normalizeEmptyToNull } from '@/utils/normalizer';
import { determineCategoryAndSpecies } from '@/utils/determineCategoryAndSpecies';
import { KeywordOptions } from '@/types/keywordOption';

export const fetchPreNewsData = async (
    searchWord: string,
    selectedSize: number,
    selectedSort: string,
    categoryOptions: KeywordOptions,
    speciesOptions: KeywordOptions,
): Promise<InsertPreNewsItem[]> => {
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { category, category_id, species, species_id } = determineCategoryAndSpecies(
            item.title,
            item.description,
            categoryOptions,
            speciesOptions,
        );

        return {
            ...item,
            pre_news_id: undefined,
            title: cleanText(item.title),
            description: cleanText(item.description),
            category: normalizeEmptyToNull(category),
            category_id: normalizeEmptyToNull(category_id),
            species: normalizeEmptyToNull(species),
            species_id: normalizeEmptyToNull(species_id),
            pubDate: new Date(item.pubDate).toISOString(),
            created_at: new Date().toISOString(),
        };
    });
};
