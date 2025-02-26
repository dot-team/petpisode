'use server';

import { AuthError, Session, User } from '@supabase/supabase-js';
import type { SignupFormType } from '@/hooks';
import createClientForServer from '../server';

interface SignupResponse {
    error: AuthError | null;
    data: {
        user: User | null;
        session: Session | null;
    };
}

const signupWithEmailPassword = async (formData: SignupFormType): Promise<SignupResponse> => {
    try {
        const supabase = await createClientForServer();

        const newsSubscribeType = [];
        if (formData.agreeEmailNews) newsSubscribeType.push('email');
        if (formData.agreeWebPushNews) newsSubscribeType.push('web push');

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    nickname: formData.nickname,
                    news_subscribe: formData.agreeEmailNews || formData.agreeWebPushNews,
                    news_subscribe_type: newsSubscribeType.join('|') || null,
                    provider: 'email',
                    role: 'user',
                    profile_image_url: null,
                },
            },
        });

        if (error) {
            if (error.code === 'email_exists') {
                throw new Error('이미 등록된 이메일입니다.');
            }
            throw new Error(error.message || '회원가입 중 오류가 발생했습니다.');
        }

        return { data, error };
    } catch (error) {
        console.error('Signup error:', error);
        throw new Error(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    }
};

export { signupWithEmailPassword };
