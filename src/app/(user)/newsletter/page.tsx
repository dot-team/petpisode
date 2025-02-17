'use client';

import { categoryOptions, speciesOptions } from '@/app/admin/newsletter/collect/page';
import React, { useState } from 'react';

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
            <div id="newContentsWrap" className="mt-4 flex flex-wrap" />
        </div>
    );
}

export default NewsLetterPage;
