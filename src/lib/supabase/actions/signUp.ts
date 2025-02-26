'use server';

import { AuthError, Session, User } from '@supabase/supabase-js';
import type { SignupFormType } from '@/hooks';
import { createDataFromServer } from '@/services';
import { TableData } from '@/types';
import createClientForServer from '../server';

interface SignupResponse {
    error: AuthError | null;
    data: {
        user: User | null;
        session: Session | null;
    };
}

type ShouldAddUserData = Pick<
    TableData<'users'>,
    | 'user_id'
    | 'nickname'
    | 'email'
    | 'news_subscribe'
    | 'news_subscribe_type'
    | 'provider'
    | 'role'
>;

// 회원 테이블에 데이터 추가 함수
export async function insertUserData(userData: ShouldAddUserData) {
    return createDataFromServer('users', {
        user_id: userData.user_id,
        nickname: userData.nickname,
        news_subscribe: userData.news_subscribe || false,
        news_subscribe_type: userData.news_subscribe_type || null,
        provider: userData.provider || 'email',
        role: userData.role || 'user',
        email: userData.email,
    });
}

// Auth 사용자 삭제 함수
export async function deleteAuthUser(userId: string) {
    try {
        const supabase = await createClientForServer();
        const { error } = await supabase.auth.admin.deleteUser(userId);

        if (error) {
            console.error('회원 데이터 추가 에러 후 Auth user 삭제 에러:', error);
            return { success: false, error };
        }

        return { success: true, error: null };
    } catch (error) {
        console.error('회원 데이터 추가 에러 후 Auth user 삭제 에러:', error);
        return {
            success: false,
            error: error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.'),
        };
    }
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
        });

        if (error) {
            if (error.code === 'email_exists') {
                throw new Error('이미 등록된 이메일입니다.');
            }
            throw new Error(error.message || '회원가입 중 오류가 발생했습니다.');
        }

        // auth 회원가입 성공일 때, 회원 테이블에 데이터 추가
        if (data.user) {
            try {
                await insertUserData({
                    user_id: data.user.id,
                    email: formData.email,
                    nickname: formData.nickname,
                    news_subscribe: formData.agreeEmailNews || formData.agreeWebPushNews,
                    news_subscribe_type:
                        newsSubscribeType.length > 0 ? newsSubscribeType.join('|') : null,
                    provider: 'email',
                    role: 'user',
                });
            } catch (insertError) {
                // 사용자 데이터 삽입 실패 시 Auth 사용자 삭제
                await deleteAuthUser(data.user.id);

                console.error('회원 정보 저장 중 오류:', insertError);
                throw new Error('회원 정보 저장 중 오류가 발생했습니다.');
            }
        }

        return { data, error };
    } catch (error) {
        console.error('회원가입 오류:', error);
        throw new Error(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    }
};

export { signupWithEmailPassword };
