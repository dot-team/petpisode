import { useEffect, useState } from 'react';
import { fetchAllDataFromClient } from '@/services';

export interface PreNewsItem {
    pre_news_id: string | null;
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
    created_at: string;
    category: string | null;
    category_id: string | null;
    species: string | null;
    species_id: string | null;
}

const usePreNewsItem = () => {
    const [data, setData] = useState<PreNewsItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const supaData = await fetchAllDataFromClient('pre_news_items');
            setData(supaData);
        };

        fetchData();
    }, []);

    return data;
};

export default usePreNewsItem;
