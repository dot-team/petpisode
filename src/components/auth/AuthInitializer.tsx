'use client';

import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useUserActions } from '@/stores';

interface AuthInitializerProps {
    user: User | null;
}

function AuthInitializer({ user }: AuthInitializerProps) {
    const { setUser } = useUserActions();

    useEffect(() => {
        if (user) {
            const userInfo = {
                email: user.user_metadata.email,
                nickname: user.user_metadata.nickname,
                role: user.user_metadata.role,
                profile_image_url: user.user_metadata.profile_image_url,
            };

            setUser(userInfo);
        }
    }, [user, setUser]);

    return null;
}

export default AuthInitializer;
