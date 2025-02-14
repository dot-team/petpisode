'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/lib/supabase/client';
import { useUserActions, useUserStore } from '@/stores';

export function useAuth() {
    const router = useRouter();
    const { user, isUserLoading } = useUserStore();
    const { setUser, setUserLoading } = useUserActions();

    useEffect(() => {
        // 현재 세션 확인
        const checkSession = async () => {
            try {
                const {
                    data: { session },
                } = await supabaseClient.auth.getSession();
                setUser(session?.user ?? null);
            } finally {
                setUserLoading(false);
            }
        };

        checkSession();

        // 인증 상태 변경 구독
        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);

            if (event === 'SIGNED_IN') {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, setUser, setUserLoading]);

    const signOut = async () => {
        try {
            await supabaseClient.auth.signOut();
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return {
        user,
        isUserLoading,
        isAuthenticated: !!user,
        signOut,
    };
}
