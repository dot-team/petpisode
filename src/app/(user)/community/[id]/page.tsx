import Image from 'next/image';
import React from 'react';
import { Input } from '@/components/common';
import { SendHorizontal } from 'lucide-react';
import img from '../../../../../public/images/test1.svg';

function CommunityDetail() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 mt-6 mb-20">
            <div className="flex w-full gap-2">
                <div className="w-[100px] h-[100px] rounded-full bg-red-500" />
                <div className="flex flex-col w-full gap-2">
                    <div className="flex gap-4">
                        <span className="text-lg">홍길동</span>
                        <span className="text-lg text-[#7171a]">약 1시간 전</span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-2xl">제목 입니다</h1>
                        <ul className="flex gap-4">
                            <li>수정</li>
                            <li>삭제</li>
                        </ul>
                    </div>
                    <div>
                        <span className="text-base text-[#b7b7bc]">등록 일자</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full ">
                <div className="w-full h-[500px]  rounded-lg">
                    <Image
                        src={img}
                        alt="썸네일"
                        width={800}
                        height={400}
                        className="object-cover w-full h-full transition-all ease-in-out rounded-lg"
                    />
                </div>
            </div>
            <div className="w-full">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className="flex items-center justify-around w-full ">
                <ul className="flex items-center justify-around w-full">
                    <li className="flex flex-col items-center">
                        좋아요<span>10</span>
                    </li>
                    <li className="flex flex-col items-center">
                        북마크<span>10</span>
                    </li>
                    <li className="flex flex-col items-center">
                        공유<span>10</span>
                    </li>
                </ul>
            </div>
            <div className=" w-full bg-[#FCFAF6] rounded-lg p-4 flex gap-2 items-center">
                <div className="w-[36px] h-[36px] rounded-full bg-red-50" />
                <div className="w-full">
                    <Input placeholder="내용을 입력하세요" className="border-none rounded-lg " />
                </div>
                <div>
                    <SendHorizontal size={30} color="#3B427C" />
                </div>
            </div>
            <div className="w-full flex gap-3 items-center p-4 bg-[#FCFAF6] ">
                <div className="w-[36px] h-[36px] rounded-full bg-red-50" />
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4">
                        <span>닉네임</span>
                        <span>2024.11.11 14:00</span>
                    </div>
                    <div className="flex">
                        <p>
                            댓글 내용 It has survived not only five centuries, but also the leap
                            into
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span>코멘트</span>
                    <span>삭제</span>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetail;
