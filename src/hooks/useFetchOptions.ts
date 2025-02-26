import { useEffect, useState } from 'react';
import { fetchAllDataFromClient } from '@/services';

const useFetchOptions = () => {
    const [categoryOptions, setCategoryOptions] = useState<{
        categoryKeywordMap: Record<string, string[]>;
        categoryMap: Record<string, string>;
    }>({
        categoryKeywordMap: {},
        categoryMap: {},
    });

    const [speciesOptions, setSpeciesOptions] = useState<{
        speciesKeywordMap: Record<string, string[]>;
        speciesMap: Record<string, string>;
    }>({
        speciesKeywordMap: {},
        speciesMap: {},
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const categories = await fetchAllDataFromClient('news_categories');
            const categoryKeywords = await fetchAllDataFromClient('category_keywords');

            const categoryKeywordMap: Record<string, string[]> = {};
            categoryKeywords.forEach(keyword => {
                const categoryId = keyword.category_id;
                if (!categoryKeywordMap[categoryId]) {
                    categoryKeywordMap[categoryId] = [];
                }
                categoryKeywordMap[categoryId].push(keyword.keyword_name);
            });

            const categoryMap: Record<string, string> = {};
            categories.forEach(category => {
                categoryMap[category.category_id] = category.description;
            });

            setCategoryOptions({ categoryKeywordMap, categoryMap });

            // 종 데이터 가져오기
            const species = await fetchAllDataFromClient('news_species');
            const speciesKeywords = await fetchAllDataFromClient('species_keywords');

            const speciesKeywordMap: Record<string, string[]> = {};
            speciesKeywords.forEach(keyword => {
                const speciesId = keyword.species_id;
                if (!speciesKeywordMap[speciesId]) {
                    speciesKeywordMap[speciesId] = [];
                }
                speciesKeywordMap[speciesId].push(keyword.keyword_name);
            });

            const speciesMap: Record<string, string> = {};
            species.forEach(sp => {
                speciesMap[sp.species_id] = sp.description;
            });

            setSpeciesOptions({ speciesKeywordMap, speciesMap });
        };

        fetchOptions();
    }, []);

    return { categoryOptions, speciesOptions };
};

export default useFetchOptions;
