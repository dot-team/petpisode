'use client';

import { useParams } from 'next/navigation';
import React from 'react';

function NewsLetterDetailPage() {
    const params = useParams();
    const newsId = params.id;

    return <div>news_id : {newsId}</div>;
}

export default NewsLetterDetailPage;
