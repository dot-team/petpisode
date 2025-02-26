import { useEffect, useState } from 'react';
import { fetchAllDataFromClient } from '@/services';

const useFetchOptions = () => {
    const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);
    const [speciesOptions, setSpeciesOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            // 카테고리 데이터 가져오기
            const categories = await fetchAllDataFromClient('news_categories');

            // 종 데이터 가져오기
            const species = await fetchAllDataFromClient('news_species');

            // 데이터 변환
            if (categories) {
                setCategoryOptions(
                    categories.map(cat => ({ value: cat.category, label: cat.description })),
                );
            }
            if (species) {
                setSpeciesOptions(
                    species.map(sp => ({ value: sp.species, label: sp.description })),
                );
            }
        };

        fetchOptions();
    }, []);

    return { categoryOptions, speciesOptions };
};

export default useFetchOptions;
