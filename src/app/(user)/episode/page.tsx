'use client';

import { Button, Input, Label, Textarea } from '@/components';
import React from 'react';

function EpisodePage() {
    const onClickSendBtn = () => {
        console.log('onClickSendBtn');
    };

    return (
        <div>
            <div className="mb-4">
                <div className="text-l font-bold">우리와 함께 특별한 이야기를 나눠보세요!</div>
                <div className="mt-2">
                    애완동물과의 특별한 순간, 훈훈한 에피소드, 그리고 산책 중 있었던 재미있는 경험을
                    공유해 주세요.
                    <br />
                    여러분의 이야기는 더 많은 사람들에게 기쁨과 감동을 전할 수 있습니다.
                </div>
            </div>
            <div className="bg-secondary-light h-80 rounded-dot-s px-6 flex flex-col justify-evenly">
                <div className="flex gap-4 items-center">
                    <Label htmlFor="title" className="w-14 flex justify-end">
                        제목
                    </Label>
                    <Input
                        placeholder="제목을 입력하세요"
                        variant="secondary"
                        className="border-none rounded-lg"
                    />
                </div>
                <div className="flex gap-4 items-start">
                    <Label htmlFor="content" className="pt-3 w-14 flex justify-end items-baseline">
                        내용
                    </Label>
                    <Textarea variant="secondary" className="border-none rounded-lg h-32" />
                </div>
                <div className="flex gap-4 items-start">
                    <Label htmlFor="imgFile" className="pt-3 w-14 flex justify-end">
                        첨부파일
                    </Label>
                    <Input variant="secondary" className="border-none rounded-lg" />
                </div>
                <Button onClick={onClickSendBtn} variant="secondary" className="w-20 mx-auto">
                    보내기
                </Button>
            </div>
        </div>
    );
}

export default EpisodePage;
