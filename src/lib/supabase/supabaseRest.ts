import axios from 'axios';
import { SUPABASE_BASE_PATH } from '@/constants/endpoints';
import getSupabaseEnv from './utils/getSupabaseEnv';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = getSupabaseEnv();
const supabaseRest = axios.create({
    baseURL: `${SUPABASE_URL}${SUPABASE_BASE_PATH}`,
    headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json',
    },
});

export default supabaseRest;
