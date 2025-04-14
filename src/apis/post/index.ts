import supabaseClient from '@/lib/supabase/client';
import { createDataFromClient } from '@/services';

const getCurrentUser = async () => {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
        console.error('Error getting user:', error);
        return null;
    }

    if (data && data.user) {
        return data.user.id;
    }

    return null;
};

export const communityPost = async (getPublicUrl: string, content: string, title: string) => {
    const currentUserId = await getCurrentUser();

    if (!currentUserId) {
        throw new Error('사용자가 로그인되지 않았습니다.');
    }
    try {
        const data = await createDataFromClient('posts', {
            user_id: currentUserId,
            content: content,
            img: getPublicUrl,
            title: title,
            view: '0',
            is_activated: false,
            report_count: 0,
            like: '0',
        });
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
};
