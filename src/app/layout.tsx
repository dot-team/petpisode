import type { Metadata } from 'next';
import Providers from '@/providers/Providers';
import { fetchDataByIdFromServer } from '@/services';
import { Toaster } from '@/components/common';
import { AuthInitializer } from '@/components/auth/';
import createClientForServer from '@/lib/supabase/server';
import '@/styles/globals.css';
import { TableData } from '@/types';

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

    let userData = null;

    // 로그인 여부에 따라 user 전역 상태 설정
    if (user?.id) {
        const [data] = (await fetchDataByIdFromServer(
            'users',
            'user_id',
            user.id,
        )) as TableData<'users'>[];
        userData = {
            email: data.email,
            nickname: data.nickname,
            role: data.role,
            profile_image_url: data.proflie_image_url,
        };
    }

    return (
        <html lang="ko">
            <body className="antialiased">
                {userData && <AuthInitializer user={userData} />}
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
