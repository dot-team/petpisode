import axios from 'axios';

export const getHtml = async (url: string) => {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        const response = await axios.get(proxyUrl + encodeURIComponent(url)); // 헤더 없이 요청
        return response.data;
    } catch (error) {
        console.error('Error fetching HTML content:', error);
        return null;
    }
};
