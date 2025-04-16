import axios from 'axios';
import { TableColumn, TableData, TableName, TablesInsert, TablesUpdate } from '@/types';
import { SUPABASE_ENDPOINT } from '@/constants/endpoints';
import { createClient } from '@supabase/supabase-js';
import { InsertPreNewsItem } from '@/types/preNewsData';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const fetchAllDataFromClient = async <T extends TableName>(
    table: T,
): Promise<TableData<T>[]> => {
    const response = await axios.get<TableData<T>[]>(SUPABASE_ENDPOINT.BY_TABLE(table));
    return response.data;
};

export const fetchDataByIdFromClient = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
): Promise<TableData<T>[]> => {
    const response = await axios.get<TableData<T>[]>(
        SUPABASE_ENDPOINT.BY_TABLE_ID_COLUMN(table, column, id),
    );
    return response.data;
};

export const createDataFromClient = async <T extends TableName>(
    table: T,
    payload: TablesInsert<T>,
): Promise<TablesInsert<T>> => {
    const response = await axios.post<TablesInsert<T>>(SUPABASE_ENDPOINT.BY_TABLE(table), payload);
    return response.data;
};

export const createMultipleDataFromClient = async <T extends TableName>(
    table: T,
    payload: TablesInsert<T>[],
): Promise<TablesInsert<T>[]> => {
    try {
        const response = await axios.post<TablesInsert<T>[]>(
            SUPABASE_ENDPOINT.BY_TABLE(table),
            payload,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('전체 오류 객체:', error);
        } else {
            console.error('알 수 없는 오류:', error);
        }
        throw error;
    }
};

export const supabase = createClient<TableName>(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

export const createPreNewsItems = async (data: InsertPreNewsItem[]) => {
    const { data: supaData, error } = await supabase.from('pre_news_items').insert(data);
    if (error) throw error;
    return supaData;
};

export const updateDataByIdFromClient = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
    payload: TablesUpdate<T>,
): Promise<TablesUpdate<T>> => {
    const response = await axios.patch<TablesUpdate<T>>(
        SUPABASE_ENDPOINT.BY_TABLE_ID_COLUMN(table, column, id),
        payload,
    );
    return response.data;
};

export const deleteDataByIdFromClient = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
): Promise<void> => {
    try {
        const response = await axios.delete(
            SUPABASE_ENDPOINT.BY_TABLE_ID_COLUMN(table, column, id),
        );

        if (response.status === 204) {
            console.log('삭제 성공');
        } else {
            throw new Error('삭제 처리 중 오류 발생');
        }
    } catch (error) {
        console.error('삭제 실패:', error);
        throw error;
    }
};

export const checkDuplicateData = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    value: string,
): Promise<boolean> => {
    const query = SUPABASE_ENDPOINT.BY_TABLE_ID_COLUMN(
        table,
        column,
        encodeURIComponent(encodeURIComponent(value)),
    );
    const response = await axios.get(query);
    return response.data.length > 0;
};

export const deleteAllDataFromClient = async <T extends TableName>(table: T): Promise<void> => {
    try {
        const response = await axios.delete(SUPABASE_ENDPOINT.BY_TABLE(table));

        if (response.status === 204) {
            console.log('전체 삭제 성공');
        } else {
            throw new Error('전체 삭제 처리 중 오류 발생');
        }
    } catch (error) {
        console.error('전체 삭제 실패:', error);
        throw error;
    }
};
