import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const client_id = process.env.NAVER_NEWS_CLIENT_ID;
const client_secret = process.env.NAVER_NEWS_CLIENT_SECRET;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const sort = searchParams.get('sort') || 'sim';
    const display = searchParams.get('display') || '10';

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: { query, display, sort },
            headers: {
                'X-Naver-Client-Id': client_id!,
                'X-Naver-Client-Secret': client_secret!,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('❌ 네이버 뉴스 API 요청 실패:', error.response?.data || error.message);
        return NextResponse.json(
            {
                error: 'Failed to fetch data from Naver API',
                details: error.response?.data || error.message,
            },
            { status: 500 },
        );
    }
}
