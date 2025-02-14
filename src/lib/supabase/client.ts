import type { Database } from '@/types';
import { createBrowserClient } from '@supabase/ssr';
import getSupabaseEnv from './utils/getSupabaseEnv';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getSupabaseEnv();

const supabaseClient = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

export default supabaseClient;
