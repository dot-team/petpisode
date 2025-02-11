import { TableColumn, TableName } from '@/types';

export const SUPABASE_BASE_PATH = '/rest/v1/';

export const SUPABASE_ENDPOINT = {
    BOOKMARKS: 'bookmarks',
    CATEGORY_PUBLISH_LOGS: 'category_publish_logs',
    CATEGORY_SEND_LOGS: 'category_send_logs',
    COMMENTS: 'comments',
    LIKES: 'likes',
    NEWS_CATEGORIES: 'news_categories',
    NEWS_ITEMS: 'news_items',
    NEWS_KEYWORDS: 'news_keywords',
    POSTS: 'posts',
    REPORTS: 'reports',
    USERS: 'users',
    BY_ID: <T extends TableName>(table: T, column: TableColumn<T>, id: string): string =>
        `${table}?${String(column)}=eq.${id}`,
    BY_TABLE: (table: TableName) => `/api/${table}`,
    BY_TABLE_ID_COLUMN: <T extends TableName>(table: T, column: TableColumn<T>, id: string) =>
        `/api/${table}/${id}?column=${String(column)}`,
};

export const GEMINI_ENDPOINT = '/api/reconstruct-contents';
