'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Heart, Bookmark, Share } from 'lucide-react';
import { data } from '../page';

function NewsLetterDetailPage() {
    const params = useParams();
    const newsId = params.id;
    const news = data.find(item => item.news_id === newsId);
    const [isLiked] = useState(false);
    const [isBookmarked] = useState(false);

    const formatRelativeTime = (timestamp?: string) => {
        if (!timestamp) return '';
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000); // 초 단위 차이 계산

        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}일 전`;
    };

    const onClickLikeBtn = () => {
        console.log('like');
    };

    const onClickBookmarkBtn = () => {
        console.log('bookmark');
    };

    const onClickShareBtn = () => {
        console.log('share');
    };

    return (
        <div>
            <div className="text-s flex gap-4">
                <div>{news?.user_name}</div>
                <div className="text-dot-gray-light">{formatRelativeTime(news?.created_at)}</div>
            </div>
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
            <div className="flex justify-evenly my-4">
                <div className="flex flex-col items-center text-secondary">
                    <button type="button" onClick={onClickLikeBtn} className="outline-none">
                        <Heart className={`${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <div>0</div>
                </div>
                <div className="flex flex-col items-center text-secondary">
                    <button type="button" onClick={onClickBookmarkBtn} className="outline-none">
                        <Bookmark className={`${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <div>0</div>
                </div>
                <div className="flex flex-col items-center text-secondary">
                    <button type="button" onClick={onClickShareBtn} className="outline-none">
                        <Share />
                    </button>
                    <div>0</div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetterDetailPage;
