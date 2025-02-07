'use client';

import { Button, Input, Label } from '@/components/common';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/common/Select/Select';
import { MoveRight } from 'lucide-react';
import React from 'react';

function NewsletterCollect() {
    const onClickAPIRequestBtn = () => {
        console.log('onClickAPIRequestBtn');
    };
    const onClickSaveDBBtn = () => {
        console.log('onClickSaveDBBtn');
    };
    const onClickClearSheetBtn = () => {
        console.log('onClickClearSheetBtn');
    };
    return (
        <div className="w-4/5 mx-auto">
            <div id="apiRequestSearchBar" className="flex items-center gap-3 my-4">
                <div className="flex gap-4 bg-zinc-200 py-3 px-5">
                    <div className="flex gap-1">
                        <Label htmlFor="searchWord" className="flex items-center">
                            검색어
                        </Label>
                        <Input id="searchWord" className="w-36" variant="admin" />
                    </div>
                    <div className="flex gap-1">
                        <Label htmlFor="count" className="flex items-center">
                            개수
                        </Label>
                        <Select defaultValue="10">
                            <SelectTrigger id="count" variant="admin" className="w-32 bg-dot-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-1">
                        <Label htmlFor="sort" className="flex items-center">
                            정렬
                        </Label>
                        <Select defaultValue="date">
                            <SelectTrigger id="sort" variant="admin" className="w-32 bg-dot-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">최신순</SelectItem>
                                <SelectItem value="sim">정확도순</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={onClickAPIRequestBtn} variant="admin" className="">
                    뉴스 API 호출
                </Button>
            </div>

            <div id="contentWrap" className="flex gap-5 items-center">
                <div id="beforeSelected" className="w-2/5">
                    <div id="apiRequestSearchBar" className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <Label htmlFor="category" className="flex items-center">
                                카테고리
                            </Label>
                            <Select defaultValue="health">
                                <SelectTrigger
                                    id="category"
                                    variant="admin"
                                    className="w-20 bg-dot-white"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="health">건강</SelectItem>
                                    <SelectItem value="training">훈련</SelectItem>
                                    <SelectItem value="care">관리</SelectItem>
                                    <SelectItem value="issue">이슈</SelectItem>
                                    <SelectItem value="story">이야기</SelectItem>
                                    <SelectItem value="activity">활동</SelectItem>
                                    <SelectItem value="adoption">입양</SelectItem>
                                    <SelectItem value="fun">재미</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Label htmlFor="species" className="flex items-center">
                                종
                            </Label>
                            <Select defaultValue="dog">
                                <SelectTrigger
                                    id="species"
                                    variant="admin"
                                    className="w-32 bg-dot-white"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dog">강아지</SelectItem>
                                    <SelectItem value="cat">고양이</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <MoveRight />
                <div id="afterSelected" className="w-2/5">
                    <div id="btnWrap" className="flex gap-4 justify-end">
                        <Button onClick={onClickSaveDBBtn} variant="admin" className="">
                            DB에 저장
                        </Button>
                        <Button onClick={onClickClearSheetBtn} variant="admin" className="">
                            스프레드시트 초기화
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterCollect;
