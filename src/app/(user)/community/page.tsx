import PostListCard from '@/components/layout/PostListCard/PostListCard';
import PostFormCard from '@/components/layout/Postcard/PostFormCard';
import React from 'react';

const data = [
    {
        id: 1,
        name: '이름',
        profile: '',
        thumil: '',
        createdAt: '2025-01-29',
        title: '제목',
        discription: '설명입니다',
        commentCount: '1',
        likeCount: '3',
        bookmarkCount: '3',
    },
    {
        id: 2,
        name: '이름',
        profile: '',
        thumil: '',
        createdAt: '2025-01-29',
        title: '제목',
        discription: '설명입니다',
        commentCount: '1',
        likeCount: '3',
        bookmarkCount: '3',
    },
];

function CommunityPage() {
    return (
        <>
            <PostFormCard />
            <div className="flex flex-col items-center justify-center w-full gap-20 mt-10">
                {data.map(value => (
                    <PostListCard value={value} key={value.id} />
                ))}
            </div>
        </>
    );
}

export default CommunityPage;
