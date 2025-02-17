'use client';

import { categoryOptions, speciesOptions } from '@/app/admin/newsletter/collect/page';
import React, { useState } from 'react';

const data = [
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c218',
        title: 'What is Lorem Ipsum?',
        contents:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img_url:
            'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
        summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        source: 'https://www.naver.com/',
        species: '강아지',
        like: 0,
        share: 0,
        is_published: true,
        is_sended: true,
        source_published_at: '2025.02.17 12:30',
        created_at: '2025.02.17 12:30',
        category: '건강',
        user_name: '네이버 뉴스',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c228',
        title: 'What is Lorem Ipsum?',
        contents:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img_url: '',
        summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        source: 'https://www.naver.com/',
        species: '강아지',
        like: 0,
        share: 0,
        is_published: true,
        is_sended: true,
        source_published_at: '2025.02.17 12:30',
        created_at: '2025.02.17 12:30',
        category: '건강',
        user_name: '네이버 뉴스',
    },
    {
        news_id: '5bee582a-a4c5-4f1a-b58e-5f2eb355c238',
        title: 'What is Lorem Ipsum?',
        contents:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img_url:
            'https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_1275055966-1.png',
        summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        source: 'https://www.naver.com/',
        species: '고양이',
        like: 0,
        share: 0,
        is_published: true,
        is_sended: true,
        source_published_at: '2025.02.17 12:30',
        created_at: '2025.02.17 12:30',
        category: '건강',
        user_name: '네이버 뉴스',
    },
];

function NewsLetterPage() {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [activeSpecies, setActiveSpecies] = useState('전체');

    const onClickCategory = (category: string) => {
        setActiveCategory(category);
    };

    const onClickSpecies = (species: string) => {
        setActiveSpecies(species);
    };

    return (
        <div>
            <div id="filterWrap">
                <ul id="categoryFilter" className="flex gap-20">
                    {categoryOptions.map(category => (
                        <li key={category.value} value={category.value}>
                            <button
                                type="button"
                                className={`hover:text-primary text-s ${
                                    activeCategory === category.label
                                        ? 'text-primary font-bold'
                                        : ''
                                }`}
                                onClick={() => onClickCategory(category.label)}
                            >
                                {category.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul id="speciesFilter" className="mt-2 flex gap-20">
                    {speciesOptions.map(species => (
                        <li key={species.value} value={species.value}>
                            <button
                                type="button"
                                className={`hover:text-primary text-s ${
                                    activeSpecies === species.label ? 'text-primary font-bold' : ''
                                }`}
                                onClick={() => onClickSpecies(species.label)}
                            >
                                {species.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="newContentsWrap" className="mt-4 flex flex-wrap">
                {data.map(news => (
                    <div
                        key={news.news_id}
                        className="w-full pb-4 mb-4 border-b border-area-gray flex justify-between"
                    >
                        <div
                            id="newsText"
                            className={`${news.img_url ? 'w-4/5' : 'w-full'} flex flex-col justify-around`}
                        >
                            <div id="newsSource" className="text-xs text-dot-gray-dark">
                                {news.user_name}
                            </div>
                            <div id="newsTitle" className="font-bold">
                                {news.title}
                            </div>
                            <div
                                id="newsContents"
                                className="text-s text-dot-gray-dark2 line-clamp-2"
                            >
                                {news.contents}
                            </div>
                            <div id="newsBottomWrap" className="text-s text-dot-gray-dark">
                                <div id="newsDate">{news.created_at}</div>
                            </div>
                        </div>
                        {news.img_url && (
                            <div
                                id="newsImg"
                                className="w-[200px] h-[150px] overflow-hidden flex items-center justify-center"
                            >
                                <img
                                    src={news.img_url}
                                    alt="뉴스이미지"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsLetterPage;
