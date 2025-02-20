import { supabaseRest } from '@/lib';

export const communityPost = async () => {
    const data = await supabaseRest.post('rpc/posts', {
        content: content,
        title: title,
        img: img,
    });
};
