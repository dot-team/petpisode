'use server';

import type { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { LoginFormState } from '@/types';
import createClientForServer from '../server';

const emailLoginSchema = z.object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
    password: z
        .string()
        .min(1, '비밀번호를 입력해주세요.')
        .min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

// 로그인 에러 메시지 변환 함수
function getErrorMessage(error: string) {
    const errorMessages: Record<string, string> = {
        invalid_credentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
        email_not_confirmed: '이메일 인증이 필요합니다.',
        over_request_rate_limit: '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
    };

    return errorMessages[error] || error;
}

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

        // 로그인 성공 시 홈으로 리다이렉트
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return {
            errors: {
                general: ['서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'],
            },
        };
    }
}

const signInWith = (provider: Provider) => async () => {
    const supabase = await createClientForServer();

    const authCallbackUrl = `${process.env.SITE_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: authCallbackUrl,
        },
    });

    console.log(data);

    if (error) {
        console.log(error);
    }

    redirect(data.url as string);
};

const signInWithGoogle = signInWith('google');

const signOut = async () => {
    const supabase = await createClientForServer();
    await supabase.auth.signOut();
    revalidatePath('/');
};

export { signinWithEmailPassword, signInWithGoogle, signOut };
