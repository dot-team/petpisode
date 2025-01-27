import { Database } from './supabaseTypes';

export type TableName = keyof Database['public']['Tables'];
export type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];
