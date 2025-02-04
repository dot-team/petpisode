'use client';

import React from 'react';
import { UserHeader } from '@/components/layout/Header/UserHeader';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col min-h-screen">
            <UserHeader />
            <main className="container flex-1 py-4 md:py-7">{children}</main>
        </div>
    );
}
