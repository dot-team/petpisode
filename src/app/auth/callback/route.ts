import { NextRequest, NextResponse } from 'next/server';
import createClientForServer from '@/lib/supabase/server';
import { fetchDataByIdFromServer } from '@/services';
import { TableData } from '@/types';
import { deleteAuthUser, insertUserData } from '@/lib/supabase/actions/signUp';

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = await createClientForServer();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.session) {
            // 사용자 정보 확인 및 저장
            const { user } = data.session;

            // users 테이블에 사용자가 이미 존재하는지 확인
            try {
                const [existingUser] = (await fetchDataByIdFromServer(
                    'users',
                    'user_id',
                    user.id,
                )) as TableData<'users'>[];

                // 사용자가 존재하지 않으면 새로 추가
                if (!existingUser) {
                    // 사용자 정보 준비
                    const userData = {
                        user_id: user.id,
                        nickname:
                            user.user_metadata?.full_name ||
                            user.user_metadata?.name ||
                            user.email?.split('@')[0] ||
                            'User',
                        email: user.email || '',
                        provider: user.app_metadata?.provider || 'oauth',
                        news_subscribe: false, // 기본값 설정
                        news_subscribe_type: null,
                        role: 'user',
                    };

                    try {
                        await insertUserData(userData);
                    } catch (insertError) {
                        // 사용자 데이터 삽입 실패 시 Auth 사용자 삭제
                        await deleteAuthUser(user.id);

                        console.error('회원 정보 저장 중 오류:', insertError);
                        throw new Error('회원 정보 저장 중 오류가 발생했습니다.');
                    }
                }
            } catch (userCheckError) {
                console.error('Error checking existing user:', userCheckError);
            }

            const forwardedHost = request.headers.get('x-forwarded-host');
            const isLocalEnv = process.env.NODE_ENV === 'development';

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            }

            if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            }

            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
