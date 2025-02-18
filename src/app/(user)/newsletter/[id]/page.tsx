'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { data } from '../page';

function NewsLetterDetailPage() {
    const params = useParams();
    const newsId = params.id;
    const news = data.find(item => item.news_id === newsId);

    return (
        <div>
            <div className="text-s">{news?.user_name}</div>
            <div className="text-l font-bold">{news?.title}</div>
            {news?.img_url && (
                <div className="my-4 w-full h-[350px] overflow-hidden flex items-center justify-center">
                    <img
                        src={news.img_url}
                        alt="뉴스이미지"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            )}
            <div className="">{news?.contents}</div>
        </div>
    );
}

export default NewsLetterDetailPage;
