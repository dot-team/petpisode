export interface RawPreNewsItem {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
}

interface BasePreNewsItem {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
    created_at: string;
    category: string | null;
    category_id: string | null;
    species: string | null;
    species_id: string | null;
}

export interface InsertPreNewsItem extends BasePreNewsItem {
    pre_news_id?: string;
}

export interface PreNewsItem extends BasePreNewsItem {
    pre_news_id: string | null;
}
