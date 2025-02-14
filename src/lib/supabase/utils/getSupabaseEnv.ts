export default function getSupabaseEnv() {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const { SUPABASE_SERVICE_ROLE } = process.env;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error(
            'NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY가 존재하지 않습니다.',
        );
    }

    // SERVICE_ROLE은 서버사이드에서만 필요하므로 선택적으로 체크
    if (typeof window === 'undefined' && !SUPABASE_SERVICE_ROLE) {
        throw new Error('server-side에서 SUPABASE_SERVICE_ROLE이 필요합니다.');
    }

    return {
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE,
    };
}
