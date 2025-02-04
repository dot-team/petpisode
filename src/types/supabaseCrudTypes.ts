import { Database } from './supabaseTypes';

export type TableName = keyof Database['public']['Tables'];
export type TableData<T extends TableName> = Database['public']['Tables'][T]['Row'];
export type TableColumn<T extends TableName> = keyof TableData<T>;
export type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];
