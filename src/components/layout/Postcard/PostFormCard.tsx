'use client';

import { Button, Input } from '@/components/common';
import Image from 'next/image';
import React from 'react';
import img from '../../../../public/images/img_upload.svg';

function PostFormCard() {
    return (
        <div>
            <div className="flex items-center justify-center border-box">
                <div className="w-1/2 mt-10 h-[170px] flex flex-col rounded-dot-l bg-[#FCFAF6] relative ">
                    <div className="flex after:absolute after:top-[21%] after:right-[15px] after:w-[90%] after:border-[1px] after:border-solid after:border-[#E4E4E7] rounded-b-dot-l">
                        <Input
                            placeholder="제목을 입력 해주세요"
                            className={`overflow-hidden bg-transparent border-none focus-visible:ring-0 rounded-t-dot-l rounded-b-none text-2xl font-bold `}
                        />
                    </div>
                    <div className="flex flex-col flex-1 ">
                        <div className="flex flex-col flex-1 overflow-auto">
                            <div className="flex flex-1 break-words rounded-b-dot-l whitespace-break-spaces focus-visible:outline-none">
                                <p
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="border-none rounded-t-none focus:none focus-visible:ring-0 bg-[#FCFAF6] w-full text-xl p-3 focus-visible:outline-none break-all before:text-xl before:block focus:before:content-[''] before:content-space"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-4 mb-4 rounded-t-dot-l bg-[#FCFAF6]">
                            <Image src={img} alt="img_upload" width={24} height={24} />
                            <Button className="w-16 h-6 text-xs text-white bg-primary hover:bg-none ">
                                등록하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostFormCard;
