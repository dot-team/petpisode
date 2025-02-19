import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { fetchAllDataFromServer } from '@/services/supabaseServerCrud';

// VAPID 설정 추가
webpush.setVapidDetails(
    'mailto:petpisode@petpisode.petpisode',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(request: Request) {
    try {
        const { title, body, icon, url } = await request.json();

        const users = await fetchAllDataFromServer('users');
        const subscribedUsers = users.filter(user => user.push_token);

        const notifications = subscribedUsers.map(async user => {
            try {
                const subscription = JSON.parse(atob(user.push_token!));

                if (!subscription.endpoint || !subscription.keys) {
                    throw new Error('push_token이 올바르지 않습니다.');
                }

                await webpush.sendNotification(
                    subscription,
                    JSON.stringify({
                        title,
                        body,
                        icon,
                        url,
                    }),
                );
            } catch (error) {
                console.error(`푸시 알림 발송에 실패한 유저: ${user.user_id}:`, error);

                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });

        await Promise.all(notifications);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('푸시 알림 에러:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
