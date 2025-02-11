'use client';

import AdminNewletterCollectTable from '@/components/admin/AdminNewletterCollectTable';
import { Button, Input, Label } from '@/components/common';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/common/Select/Select';
import { MoveRight } from 'lucide-react';
import React, { useState } from 'react';

const leftHeader = ['제목', '게시일자'];
const rightHeader = ['제목', '게시일자', '카테고리', '종'];
const data = [
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c218',
        title: 'React 소개',
        link: 'https://naver.com',
        date: '2025.02.07 12:30',
        category: '건강',
        species: '강아지',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c219',
        title: 'JavaScript 기본 문법',
        link: 'https://example.com/img/js_syntax.jpg',
        date: '2025.02.07 17:30',
        category: '건강',
        species: '고양이',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c220',
        title: 'Node.js 설치 방법',
        link: 'https://example.com/img/nodejs_install.jpg',
        date: '2025.02.08 12:30',
        category: '훈련',
        species: '강아지',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c221',
        title: '배포를 위한 Git과 GitHub 활용',
        link: 'https://example.com/img/git_deployment.jpg',
        date: '2025.02.08 14:30',
        category: '이야기',
        species: '고양이',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c222',
        title: '최신 웹 디자인 트렌드 2025',
        link: 'https://example.com/img/web_design_2025.jpg',
        date: '2025.02.09 12:30',
        category: '입양',
        species: '고양이',
    },
];

const categoryOptions = [
    { value: 'health', label: '건강' },
    { value: 'training', label: '훈련' },
    { value: 'care', label: '관리' },
    { value: 'issue', label: '이슈' },
    { value: 'story', label: '이야기' },
    { value: 'activity', label: '활동' },
    { value: 'adoption', label: '입양' },
    { value: 'fun', label: '재미' },
];

const speciesOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
];

function NewsletterCollect() {
    const [availableData, setAvailableData] = useState(data);
    const [selectedData, setSelectedData] = useState<{ [key: string]: string; news_id: string }[]>(
        [],
    );
    const selectedIds = new Set(selectedData.map(item => item.news_id));

    const handleCheckboxChange = (news_id: string, isChecked: boolean) => {
        if (isChecked) {
            const selectedItem = availableData.find(item => item.news_id === news_id);
            if (selectedItem) {
                setAvailableData(prev => prev.filter(item => item.news_id !== news_id));
                setSelectedData(prev =>
                    [...prev, selectedItem].sort(
                        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                    ),
                );
            }
        } else {
            const deselectedItem = selectedData.find(item => item.news_id === news_id);
            if (deselectedItem) {
                setSelectedData(prev => prev.filter(item => item.news_id !== news_id));
                setAvailableData(prev =>
                    [...prev, deselectedItem as (typeof availableData)[number]].sort(
                        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                    ),
                );
            }
        }
    };

    const onClickAPIRequestBtn = () => {};
    const onClickSaveDBBtn = () => {};
    const onClickClearSheetBtn = () => {};
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

            <div id="contentWrap" className="flex gap-5">
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
                                    {categoryOptions.map(category => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
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
                                    {speciesOptions.map(species => (
                                        <SelectItem key={species.value} value={species.value}>
                                            {species.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <AdminNewletterCollectTable
                        header={leftHeader}
                        data={availableData}
                        side="left"
                        onCheckboxChange={handleCheckboxChange}
                        selectedIds={selectedIds}
                    />
                </div>
                <MoveRight className="mt-40" />
                <div id="afterSelected" className="w-2/5">
                    <div id="btnWrap" className="flex gap-4 justify-end">
                        <Button onClick={onClickSaveDBBtn} variant="admin" className="">
                            DB에 저장
                        </Button>
                        <Button onClick={onClickClearSheetBtn} variant="admin" className="">
                            스프레드시트 초기화
                        </Button>
                    </div>

                    <div className="w-full">
                        <AdminNewletterCollectTable
                            header={rightHeader}
                            data={selectedData}
                            side="right"
                            onCheckboxChange={handleCheckboxChange}
                            selectedIds={selectedIds}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterCollect;
