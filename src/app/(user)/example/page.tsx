'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { reconstructNewsContents } from '@/apis';
import type { ResponseData } from '@/types';

export default function NewsSummaryPage() {
    const [newsContent, setNewsContent] = useState('');

    const {
        data: reconstructedNewsContents,
        isPending,
        isError,
        mutate,
        isSuccess,
    } = useMutation<ResponseData, Error, string>({
        mutationFn: reconstructNewsContents,
        onSuccess: data => {
            console.log('뉴스 재구성 성공:', data); // 📌 수정 필요
        },
        onError: error => {
            console.error('뉴스 재구성 실패:', error); // 📌 수정 필요
        },
    });

    const handleSubmit = () => {
        if (!newsContent.trim()) {
            alert('뉴스 본문을 입력해주세요.'); // 📌 수정 필요
            return;
        }
        mutate(newsContent);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">뉴스 요약 생성기</h1>
            <textarea
                value={newsContent}
                onChange={e => setNewsContent(e.target.value)}
                placeholder="뉴스 본문을 입력하세요"
                className="w-full p-2 border rounded mb-4"
                rows={10}
            />
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {isPending ? '생성 중...' : '생성'}
            </button>

            {isError && <p className="text-red-500 mt-2">뉴스 재구성 중 에러 발생</p>}

            {isSuccess && reconstructedNewsContents && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-red-500">선정 이유</h2>
                    <ul className="list-disc pl-5 mb-4">
                        {reconstructedNewsContents.reason.map(text => (
                            <li key={text} className="mb-2">
                                {text}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold text-red-500">뉴스 요약</h2>
                    <ul className="list-disc pl-5 mb-4">
                        {reconstructedNewsContents.summary.map(text => (
                            <li key={text} className="mb-2">
                                {text}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold text-red-500">관련 추가 정보</h2>
                    <ul className="list-disc pl-5">
                        {reconstructedNewsContents.relative.map(text => (
                            <li key={text} className="mb-2">
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
