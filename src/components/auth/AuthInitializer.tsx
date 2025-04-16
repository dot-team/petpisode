'use client';

import { useEffect } from 'react';
import { useUserActions } from '@/stores';
import { UserInfo } from '@/types';

function AuthInitializer({ user }: { user: UserInfo }) {
    const { setUser } = useUserActions();

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return null;
}

export default AuthInitializer;
