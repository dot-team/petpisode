'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { Button } from '@/components';
import { LoginDialog } from '@/components/auth';

export function AuthButtons() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isAuthenticated, handleSignOut } = useAuth();

    if (isAuthenticated) {
        return (
            <form action={handleSignOut}>
                <Button type="submit" variant="primaryOutline" size="sm">
                    로그아웃
                </Button>
            </form>
        );
    }

    return (
        <>
            <Button variant="primaryOutline" size="sm" onClick={() => setIsLoginOpen(true)}>
                로그인
            </Button>
            <LoginDialog isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
        </>
    );
}
