import axios from 'axios';
import { checkDuplicateData } from '@/services';
import { InsertPreNewsItem, RawPreNewsItem } from '@/types/preNewsData';

const cleanText = (str: string) => {
    // 1. <b> 태그 제거
    const withoutBoldTags = str.replace(/<b>/g, '').replace(/<\/b>/g, '');

    // 2. HTML 엔티티 변환
    const textarea = document.createElement('textarea');
    textarea.innerHTML = withoutBoldTags;
    return textarea.value;
};

const normalizeEmptyToNull = (value: string | undefined): string | null => {
    return value && value.trim() !== '' ? value : null;
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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const category_id = matchedCategory ? matchedCategory[0] : '';
    const category = category_id ? categoryOptions.categoryMap[category_id] || '' : '';

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const species_id = matchedSpecies ? matchedSpecies[0] : '';
    const species = species_id ? speciesOptions.speciesMap[species_id] || '' : '';

    return { category, category_id, species, species_id };
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
