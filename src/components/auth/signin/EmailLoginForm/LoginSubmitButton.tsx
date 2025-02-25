'use client';

import { Button } from '@/components';

function LoginSubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <Button
            type="submit"
            className="w-full space-l mt-6"
            size="lg"
            disabled={isPending}
            aria-disabled={isPending}
        >
            {isPending ? '로그인 중...' : 'Login'}
        </Button>
    );
}

export default LoginSubmitButton;
