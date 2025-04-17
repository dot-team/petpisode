import { useEffect, useState } from 'react';
import { fetchAllDataFromClient } from '@/services';
import { PreNewsItem } from '@/types/preNewsData';

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
