'use server';

import type { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import createClientForServer from '../server';

const signInWith = (provider: Provider) => async () => {
    const supabase = await createClientForServer();

    const authCallbackUrl = `${process.env.SITE_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: authCallbackUrl,
        },
    });

    console.log(data);

    if (error) {
        console.log(error);
    }

    redirect(data.url as string);
};

const signInWithGoogle = signInWith('google');

const signOut = async () => {
    const supabase = await createClientForServer();
    await supabase.auth.signOut();
};

export { signInWithGoogle, signOut };
