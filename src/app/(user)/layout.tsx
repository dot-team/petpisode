'use client';

import React from 'react';
import { UserHeader } from '@/components/UserHeader';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <UserHeader />
            <main className="flex-1">{children}</main>
        </div>
    );
}
