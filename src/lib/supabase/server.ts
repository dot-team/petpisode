import type { Database } from '@/types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import getSupabaseEnv from './utils/getSupabaseEnv';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getSupabaseEnv();

export default async function createClientForServer() {
    const cookieStore = await cookies();

    return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options),
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}
