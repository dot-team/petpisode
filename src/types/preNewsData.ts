export interface RawPreNewsItem {
    description: string;
    link: string;
    originallink: string;
    pubDate: string;
    title: string;
}

export interface InsertPreNewsItem {
    pre_news_id?: string;
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
