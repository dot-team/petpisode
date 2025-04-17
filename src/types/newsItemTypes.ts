export interface NewsItem {
    category_id: string | null;
    contents: string;
    created_at: string;
    img_url: string | null;
    is_published: boolean;
    is_sended: boolean;
    like: number;
    news_id: string;
    share: number;
    source: string;
    source_published_at: string;
    species_id: string | null;
    summary: string;
    title: string;
    updated_at: string;
    user_id: string | null;
}
