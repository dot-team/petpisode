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
import { useErrorToast, useSuccessToast } from '@/hooks';
import useFetchOptions from '@/hooks/useFetchOptions';
import usePreNewsItem, { PreNewsItem } from '@/hooks/usePreNewsItem';
import { checkDuplicateData, createMultipleDataFromClient } from '@/services';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const leftHeader = ['제목', '게시일자'];
const rightHeader = ['제목', '게시일자', '카테고리', '종'];

interface RawPreNewsItem {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
}

function NewsletterCollect() {
    const [searchWord, setSearchWord] = useState('');
    const [selectedSize, setSelectedSize] = useState(10);
    const [selectedSort, setSelectedSort] = useState('date');
    const successToast = useSuccessToast;
    const errorToast = useErrorToast;
    const { categoryOptions, speciesOptions } = useFetchOptions();
    const [availableData, setAvailableData] = useState<PreNewsItem[]>([]);
    const [selectedData, setSelectedData] = useState<PreNewsItem[]>([]);
    const selectedIds = new Set(selectedData.map(item => item.pre_news_id));

    const availablePreNews = usePreNewsItem();
    useEffect(() => {
        setAvailableData(availablePreNews);
    }, [availablePreNews]);

    const handleCheckboxChange = (news_id: string, isChecked: boolean) => {
        if (isChecked) {
            const selectedItem = availableData.find(item => item.pre_news_id === news_id);
            if (selectedItem) {
                setAvailableData(prev => prev.filter(item => item.pre_news_id !== news_id));
                setSelectedData(prev =>
                    [...prev, selectedItem].sort(
                        (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
                    ),
                );
            }
        } else {
            const deselectedItem = selectedData.find(item => item.pre_news_id === news_id);
            if (deselectedItem) {
                setSelectedData(prev => prev.filter(item => item.pre_news_id !== news_id));
                setAvailableData(prev =>
                    [...prev, deselectedItem as (typeof availableData)[number]].sort(
                        (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
                    ),
                );
            }
        }
    };

    const cleanText = (str: string) => {
        // 1. <b> 태그 제거
        const withoutBoldTags = str.replace(/<b>/g, '').replace(/<\/b>/g, '');

        // 2. HTML 엔티티 변환
        const textarea = document.createElement('textarea');
        textarea.innerHTML = withoutBoldTags;
        return textarea.value;
    };

    const onClickAPIRequestBtn = () => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`/api/naver-news`, {
                    params: {
                        query: searchWord,
                        sort: 'sim',
                        display: selectedSize,
                    },
                });
                const preData = response.data.items.map((item: RawPreNewsItem) => ({
                    ...item,
                    title: cleanText(item.title),
                    description: cleanText(item.description),
                }));

                const nonDuplicateData = (
                    await Promise.all(
                        preData.map(async (item: RawPreNewsItem) => {
                            const isDuplicate = await checkDuplicateData(
                                'pre_news_items',
                                'originallink',
                                item.originallink,
                            );
                            return isDuplicate ? null : item;
                        }),
                    )
                ).filter((item): item is RawPreNewsItem => item !== null);

                if (nonDuplicateData.length > 0) {
                    await createMultipleDataFromClient('pre_news_items', nonDuplicateData);
                }
                successToast({
                    title: '네이버 뉴스 API 호출 성공',
                    description: '네이버 뉴스 API 데이터가 1차 DB에 저장되었습니다.',
                });
                return preData;
            } catch (error) {
                errorToast({
                    title: '네이버 뉴스 API 호출 실패',
                    description: '네이버 뉴스 API 호출 또는 1차 DB에의 저장이 실패했습니다.',
                });
                console.error('❌ 뉴스 데이터 요청 실패:', error);
                return null;
            }
        };
        if (!selectedSize || searchWord === '' || !selectedSort) {
            errorToast({
                title: '네이버 뉴스 API 호출 실패',
                description: '검색 내용을 입력해주세요.',
            });
        } else {
            fetchNews();
        }
    };
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
                        <Input
                            id="searchWord"
                            type="text"
                            placeholder="검색어 입력"
                            value={searchWord}
                            onChange={e => setSearchWord(e.target.value)}
                            className="w-36"
                            variant="admin"
                        />
                    </div>
                    <div className="flex gap-1">
                        <Label htmlFor="size" className="flex items-center">
                            개수
                        </Label>
                        <Select
                            defaultValue={String(selectedSize)}
                            onValueChange={value => setSelectedSize(Number(value))}
                        >
                            <SelectTrigger id="size" variant="admin" className="w-32 bg-dot-white">
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
                        <Select defaultValue={selectedSort} onValueChange={setSelectedSort}>
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
                            <Select defaultValue="all">
                                <SelectTrigger
                                    id="category"
                                    variant="admin"
                                    className="w-20 bg-dot-white"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="all" value="all">
                                        전체
                                    </SelectItem>
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
                            <Select defaultValue="all">
                                <SelectTrigger
                                    id="species"
                                    variant="admin"
                                    className="w-32 bg-dot-white"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="all" value="all">
                                        전체
                                    </SelectItem>
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
