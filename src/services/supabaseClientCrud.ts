import axios from 'axios';
import { TableColumn, TableData, TableName, TablesInsert, TablesUpdate } from '@/types';
import { SUPABASE_ENDPOINT } from '@/constants/endpoints';

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
    await axios.delete(SUPABASE_ENDPOINT.BY_TABLE_ID_COLUMN(table, column, id));
};
