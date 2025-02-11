import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';
import axios from 'axios';
import { SUPABASE_BASE_PATH } from '@/constants/endpoints';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE)
    throw new Error('SUPABASE_URL, SUPABASE_SERVICE_ROLE이 존재하지 않습니다.');

export const supabaseRest = axios.create({
    baseURL: `${SUPABASE_URL}${SUPABASE_BASE_PATH}`,
    headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json',
    },
});

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});
