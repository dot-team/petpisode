import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components';
import Logo from '/public/images/logo.svg';

interface SocialLoginProps {
    onClickEmailLogin?: (isEmail: boolean) => void;
}

function SocialLogin({ onClickEmailLogin }: SocialLoginProps) {
    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-l">
            <div className="text-center space-y-2">
                <h1 className="inline-block">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="Petpisode"
                            width={227}
                            height={77}
                            className="w-[150px] md:w-[227px] h-auto"
                            priority
                        />
                    </Link>
                </h1>
                <p className="text-sm text-dot-gray-dark">
                    10초 만에 로그인하고
                    <br />
                    반려동물 정보를 얻어가세요.
                </p>
            </div>

            <div className="w-full space-y-3">
                <Button
                    className="w-full bg-[#FEE500] hover:bg-[#FEE500]/80 text-dot-black"
                    size="lg"
                >
                    카카오로 로그인
                </Button>

                <Button
                    className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                    size="lg"
                >
                    Google로 로그인
                </Button>

                {onClickEmailLogin ? (
                    <Button
                        className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                        size="lg"
                        onClick={() => onClickEmailLogin(true)}
                    >
                        이메일로 로그인
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-dot-white hover:bg-dot-white text-dot-black border"
                        size="lg"
                        asChild
                    >
                        <Link href="?method=email">이메일로 로그인</Link>
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm">
                <Link href="/signup" className="underline">
                    회원가입
                </Link>
                <span>|</span>
                <Link href="/findpw" className="text-dot-gray-dark underline">
                    비밀번호 찾기
                </Link>
            </div>
        </div>
    );
}

export default SocialLogin;
