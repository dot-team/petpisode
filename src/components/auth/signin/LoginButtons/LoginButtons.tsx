import Link from 'next/link';
import { Button } from '@/components';
import { URL } from '@/constants';
import { signInWithGoogle } from '@/lib/supabase/actions';

function LoginButtons() {
    return (
        <div className="w-full space-y-3">
            <Button className="w-full bg-[#FEE500] hover:bg-[#FEE500]/80 text-dot-black" size="lg">
                카카오로 로그인
            </Button>

            <form>
                <Button
                    formAction={signInWithGoogle}
                    className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                    size="lg"
                >
                    Google로 로그인
                </Button>
            </form>

            <Button
                className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                size="lg"
                asChild
            >
                <Link href={`${URL.LOGIN.link}?method=email`}>이메일로 로그인</Link>
            </Button>
        </div>
    );
}

export default LoginButtons;
