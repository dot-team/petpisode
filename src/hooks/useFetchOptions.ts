import { useEffect, useState } from 'react';
import { fetchAllDataFromClient } from '@/services';
import { KeywordOptions } from '@/types/keywordOption';

const useFetchOptions = () => {
    const [categoryOptions, setCategoryOptions] = useState<KeywordOptions>({
        keywordMap: {},
        labelMap: {},
    });
    const [speciesOptions, setSpeciesOptions] = useState<KeywordOptions>({
        keywordMap: {},
        labelMap: {},
    });

    useEffect(() => {
        const fetchOptions = async () => {
            // 카테고리 & 키워드 동시 요청
            const [categories, categoryKeywords] = await Promise.all([
                fetchAllDataFromClient('news_categories'),
                fetchAllDataFromClient('category_keywords'),
            ]);

            // categoryOptions 세팅
            setCategoryOptions({
                keywordMap: categoryKeywords.reduce(
                    (acc, { category_id, keyword_name }) => {
                        if (!acc[category_id]) acc[category_id] = [];
                        acc[category_id].push(keyword_name);
                        return acc;
                    },
                    {} as Record<string, string[]>,
                ),

                labelMap: categories.reduce(
                    (acc, { category_id, description }) => {
                        acc[category_id] = description;
                        return acc;
                    },
                    {} as Record<string, string>,
                ),
            });

            // 종 & 키워드 동시 요청
            const [species, speciesKeywords] = await Promise.all([
                fetchAllDataFromClient('news_species'),
                fetchAllDataFromClient('species_keywords'),
            ]);

            // speciesOptions 세팅
            setSpeciesOptions({
                keywordMap: speciesKeywords.reduce(
                    (acc, { species_id, keyword_name }) => {
                        if (!acc[species_id]) acc[species_id] = [];
                        acc[species_id].push(keyword_name);
                        return acc;
                    },
                    {} as Record<string, string[]>,
                ),

                labelMap: species.reduce(
                    (acc, { species_id, description }) => {
                        acc[species_id] = description;
                        return acc;
                    },
                    {} as Record<string, string>,
                ),
            });
        };

        fetchOptions();
    }, []);

    return { categoryOptions, speciesOptions };
};

export default useFetchOptions;
