import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestBody, ResponseData } from '@/types';
import { GEMINI_MODEL, GEMINI_PROMPT } from '@/constants';

export const POST = async (request: Request) => {
    try {
        const { newsContent }: RequestBody = await request.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        const prompt = `${GEMINI_PROMPT} ${newsContent}`;

        const result = await model.generateContent(prompt);
        const { response } = result;
        const text = response.text();

        const responseData: ResponseData = JSON.parse(text);

        return NextResponse.json(responseData);
    } catch (error) {
        console.error('제미나이 API 호출 에러:', error); // 📌 수정 필요
        return NextResponse.json({ error: '제미나이 API 호출 실패' }, { status: 500 });
    }
};
