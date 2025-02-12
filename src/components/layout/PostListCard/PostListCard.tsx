import Image from 'next/image';
import { MessageSquare, Heart, Bookmark, Share, UserRound } from 'lucide-react';

import img from '../../../../public/images/test.svg';

interface PostListCardProps {
    value: {
        id: number;
        name: string;
        profile: string;
        thumil: string;
        createdAt: string;
        title: string;
        discription: string;
        commentCount: string;
        likeCount: string;
        bookmarkCount: string;
    };
}

function PostListCard({ value }: PostListCardProps) {
    return (
        <div
            key={value.id}
            className="w-full h-[640px] flex justify-center p-6 rounded-dot-l flex-col items-center min-w-[680px]  "
        >
            <div className="flex w-full gap-10 mb-2 ">
                <div className="w-[40px] h-[40px]">
                    <UserRound
                        size={40}
                        className="object-cover w-full h-full transition-all ease-in-out rounded-full "
                    />
                </div>
                <div className="text-[20px]">{value.name}</div>
                <div className="text-[#71717A]">{value.createdAt}</div>
            </div>
            <div className="flex flex-col justify-between  gap-5 p-10 bg-area rounded-dot-l mg:max-w-[800px] min-w-[680px]">
                <div>
                    <Image src={img} alt="썸네일" width={800} height={600} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{value.title}</h1>
                </div>
                <div>
                    <h3 className="text-[20px]">{value.discription}</h3>
                </div>
                <div className="flex justify-around w-full">
                    <div className="flex items-center gap-5">
                        <MessageSquare size={24} />
                        {value.commentCount}
                    </div>
                    <div className="flex items-center gap-5">
                        <Heart size={24} />
                        {value.likeCount}
                    </div>
                    <div className="flex items-center gap-5">
                        <Bookmark size={24} />
                        {value.bookmarkCount}
                    </div>
                    <div className="flex items-center gap-5">
                        <Share size={24} />
                        {3}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostListCard;
