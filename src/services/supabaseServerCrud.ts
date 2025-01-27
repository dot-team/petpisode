import { supabase } from '@/lib';
import { TableName, TableInsert, TableUpdate } from '@/types/supabaseCrudTypes';

export const fetchAllDataFromServer = async (table: TableName) => {
    const { data, error } = await supabase.from(table).select('*');

    if (error) throw error;

    return data;
};

export const fetchDataByIdFromServer = async (table: TableName, column: string, id: string) => {
    const { data, error } = await supabase.from(table).select('*').eq(column, id).single();

    if (error) throw error;

    return data;
};

export const createDataFromServer = async <T extends TableName>(
    table: T,
    payload: TableInsert<T>,
) => {
    const { data, error } = await supabase.from(table).insert([payload]).select();

    if (error) throw error;

    return data;
};

export const updateDataByIdFromServer = async <T extends TableName>(
    table: T,
    column: string,
    id: string,
    payload: TableUpdate<T>,
) => {
    const { data, error } = await supabase.from(table).update(payload).eq(column, id).select();

    if (error) throw error;

    return data;
};

export const deleteDataByIdFromServer = async (table: TableName, column: string, id: string) => {
    const { data, error } = await supabase.from(table).delete().eq(column, id).select();

    if (error) throw error;

    return data;
};
