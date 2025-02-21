'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUserActions, useUserStore } from '@/stores';
import { signinWithEmailPassword, signOut } from '@/lib/supabase/actions/signIn';
import { LoginFormState } from '@/types';

export function useAuth() {
    const router = useRouter();
    const { user, isUserLoading } = useUserStore();
    const { clearUser, setUserLoading } = useUserActions();

    // 이메일/비밀번호 로그인
    const handleEmailLogin = useCallback(
        async (email: string, password: string): Promise<LoginFormState> => {
            try {
                setUserLoading(true);
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const result = await signinWithEmailPassword({}, formData);

                if (result.success) {
                    router.push('/');
                    router.refresh();
                }

                return result;
            } catch (error) {
                return {
                    errors: {
                        general: ['로그인 중 오류가 발생했습니다.'],
                    },
                };
            } finally {
                setUserLoading(false);
            }
        },
        [router, setUserLoading],
    );

    const handleSignOut = useCallback(async () => {
        try {
            setUserLoading(true);
            await signOut();
            clearUser();
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Sign out failed:', error);
        } finally {
            setUserLoading(false);
        }
    }, [clearUser, router, setUserLoading]);

    return {
        user,
        isUserLoading,
        isAuthenticated: !!user,
        handleEmailLogin,
        handleSignOut,
    };
}
