import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/providers/Providers';
import { Toaster } from '@/components/common';

export const metadata: Metadata = {
    title: 'Petpisde (펫피소드)',
    description:
        '반려동물 관련 뉴스레터를 받아보고, 반려동물과 함께 지내는 사람들과 소통하며 정보를 공유할 수 있는 커뮤니티',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
