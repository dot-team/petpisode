import axios from 'axios';
import { TableName, TableInsert, TableUpdate } from '@/types/supabaseCrudTypes';

export const fetchAllDataFromClient = async (table: TableName) => {
    const response = await axios.get(`/api/${table}`);

    return response.data;
};

export const fetchDataByIdFromClient = async (table: TableName, column: string, id: string) => {
    const response = await axios.get(`/api/${table}/${id}?column=${column}`);
    return response.data;
};

export const createDataFromClient = async <T extends TableName>(
    table: T,
    payload: TableInsert<T>,
) => {
    const response = await axios.post(`/api/${table}`, payload);

    return response.data;
};

export const updateDataByIdFromClient = async <T extends TableName>(
    table: T,
    column: string,
    id: string,
    payload: TableUpdate<T>,
) => {
    const response = await axios.put(`/api/${table}/${id}?column=${column}`, payload);

    return response.data;
};

export const deleteDataByIdFromClient = async (table: TableName, column: string, id: string) => {
    const response = await axios.delete(`/api/${table}/${id}?column=${column}`);

    return response.data;
};
