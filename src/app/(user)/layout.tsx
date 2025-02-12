import { ReactNode } from 'react';
import { UserHeader } from '@/components/layout';

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col min-h-screen">
            <UserHeader />
            <main className="container flex-1 py-4 md:py-7">{children}</main>
        </div>
    );
}
