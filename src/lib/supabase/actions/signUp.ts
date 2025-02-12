'use server';

import type { SignupFormType } from '@/hooks';
import createClientForServer from '../server';

const signupWithEmailPassword = async (formData: SignupFormType) => {
    const supabase = await createClientForServer();

    const newsSubscribeType = [];
    if (formData.agreeEmailNews) newsSubscribeType.push('email');
    if (formData.agreeWebPushNews) newsSubscribeType.push('web push');

    const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                nickname: formData.nickname,
                news_subscribe: formData.agreeEmailNews || formData.agreeWebPushNews,
                news_subscribe_type: newsSubscribeType.join('|'),
                provider: 'email',
            },
        },
    });

    if (error) {
        console.log(error);
        throw error;
    }
};

export { signupWithEmailPassword };
