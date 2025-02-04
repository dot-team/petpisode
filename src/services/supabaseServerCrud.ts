import { SUPABASE_ENDPOINT } from '@/constants/endpoints';
import { supabaseRest } from '@/lib';
import { TableColumn, TableData, TableName, TablesInsert, TablesUpdate } from '@/types';

export const fetchAllDataFromServer = async <T extends TableName>(
    table: T,
): Promise<TableData<T>[]> => {
    const response = await supabaseRest.get<TableData<T>[]>(table);
    return response.data;
};

export const fetchDataByIdFromServer = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
): Promise<TableData<T>[]> => {
    const response = await supabaseRest.get<TableData<T>[]>(
        SUPABASE_ENDPOINT.BY_ID(table, column, id),
    );
    return response.data;
};

export const createDataFromServer = async <T extends TableName>(
    table: T,
    payload: TablesInsert<T>,
): Promise<TablesInsert<T>[]> => {
    const response = await supabaseRest.post<TablesInsert<T>[]>(table, payload, {
        headers: {
            Prefer: 'return=representation',
        },
    });
    return response.data;
};

export const updateDataByIdFromServer = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
    payload: TablesUpdate<T>,
): Promise<TablesUpdate<T>> => {
    const response = await supabaseRest.patch<TablesUpdate<T>>(
        SUPABASE_ENDPOINT.BY_ID(table, column, id),
        payload,
    );
    return response.data;
};

export const deleteDataByIdFromServer = async <T extends TableName>(
    table: T,
    column: TableColumn<T>,
    id: string,
): Promise<void> => {
    await supabaseRest.delete(SUPABASE_ENDPOINT.BY_ID(table, column, id));
};
