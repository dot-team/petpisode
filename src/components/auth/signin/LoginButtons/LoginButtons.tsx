import Link from 'next/link';
import { Button } from '@/components';
import { URL } from '@/constants';
import { signInWithGoogle, signInWithKakao } from '@/lib/supabase/actions';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import KakaoIcon from '/public/images/kakao_icon.svg';
import GoogleIcon from '/public/images/google_icon.svg';

function LoginButtons() {
    return (
        <div className="w-full space-y-3">
            <form>
                <Button
                    formAction={signInWithKakao}
                    className="w-full bg-[#FEE500] hover:bg-[#FEE500] text-dot-black/80"
                    size="lg"
                >
                    <Image src={KakaoIcon} width={20} height={20} alt="카카오" />
                    카카오로 로그인
                </Button>
            </form>

            <form>
                <Button
                    formAction={signInWithGoogle}
                    className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                    size="lg"
                >
                    <Image src={GoogleIcon} width={20} height={20} alt="Google" />
                    Google로 로그인
                </Button>
            </form>

            <Button
                className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                size="lg"
            >
                <Mail size={20} />
                <Link href={`${URL.LOGIN.link}?method=email`}>이메일로 로그인</Link>
            </Button>
        </div>
    );
}

export default LoginButtons;
