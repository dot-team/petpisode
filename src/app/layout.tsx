import type { Metadata } from 'next';
import Providers from '@/providers/Providers';
import { Toaster } from '@/components/common';
import { AuthInitializer } from '@/components/auth/';
import createClientForServer from '@/lib/supabase/server';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Petpisode (펫피소드)',
    description:
        '반려동물 관련 뉴스레터를 받아보고, 반려동물과 함께 지내는 사람들과 소통하며 정보를 공유할 수 있는 커뮤니티',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClientForServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="ko">
            <body className="antialiased">
                <AuthInitializer user={user} />
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
