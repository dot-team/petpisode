'use server';

import type { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { LoginFormState } from '@/types';
import createClientForServer from '../server';
import getUserRole from '../utils/getUserRole';

// 로그인 폼 유효성 검사 스키마
const emailLoginSchema = z.object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

// 로그인 에러 메시지 매핑
const ERROR_MESSAGES: Record<string, string> = {
    invalid_credentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
    email_not_confirmed: '이메일 인증이 필요합니다.',
    over_request_rate_limit: '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
};

const getErrorMessage = (error: string) =>
    ERROR_MESSAGES[error] || '알 수 없는 오류가 발생했습니다.';

/**
 * 이메일과 비밀번호를 이용한 로그인 함수
 */
async function signinWithEmailPassword(
    prevState: LoginFormState,
    formData: FormData,
): Promise<LoginFormState> {
    // 유효성 검사
    const validationResult = emailLoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors as LoginFormState['errors'],
        };
    }

    try {
        // 클라이언트 생성 및 로그인 시도
        const supabase = await createClientForServer();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: validationResult.data.email,
            password: validationResult.data.password,
        });

        if (error) {
            return {
                errors: {
                    general: [getErrorMessage(error.message)],
                },
            };
        }

        if (!data.user) {
            return {
                errors: {
                    general: ['로그인에 실패했습니다. 다시 시도해주세요.'],
                },
            };
        }

        const userRole = await getUserRole(data.user.id);

        // role 정보 함께 반환
        return {
            success: true,
            userRole,
        };
    } catch (error) {
        return {
            errors: {
                general: ['서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'],
            },
        };
    }
}

/**
 * OAuth 로그인 (Google, Kakao 등)
 */
const signInWith = (provider: Provider) => async () => {
    const supabase = await createClientForServer();

    const authCallbackUrl = `${process.env.SITE_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: authCallbackUrl,
        },
    });

    if (error) {
        console.error('OAuth 로그인 실패:', error);
    }

    redirect(data.url as string);
};

const signInWithGoogle = signInWith('google');
const signInWithKakao = signInWith('kakao');

/**
 * 로그아웃 함수
 */
const signOut = async () => {
    try {
        const supabase = await createClientForServer();
        await supabase.auth.signOut();
        revalidatePath('/');
    } catch (error) {
        console.error('로그아웃 실패:', error);
    }
};

export { signinWithEmailPassword, signInWithKakao, signInWithGoogle, signOut };
