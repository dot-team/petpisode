import axios from 'axios';
import type { ResponseData } from '@/types';
import { GEMINI_ENDPOINT } from '@/constants';

export const reconstructNewsContents = async (newsContent: string) => {
    const response = await axios.post<ResponseData>(GEMINI_ENDPOINT, {
        newsContent,
    });

    return response.data;
};
