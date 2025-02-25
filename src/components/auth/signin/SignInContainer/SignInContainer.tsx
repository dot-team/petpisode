import Image from 'next/image';
import Link from 'next/link';
import { URL } from '@/constants';
import EmailLoginForm from '../EmailLoginForm/EmailLoginForm';
import LoginButtons from '../LoginButtons/LoginButtons';
import Logo from '/public/images/logo.svg';

interface SignInContainerProps {
    method?: string;
}

function SignInContainer({ method }: SignInContainerProps) {
    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-l">
            <div className="text-center space-y-2">
                <h1 className="inline-block">
                    <Link href={URL.HOME.link}>
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

            {method === 'email' ? <EmailLoginForm /> : <LoginButtons />}

            {method !== 'email' && (
                <div className="flex items-center gap-2 text-sm">
                    <Link href={URL.SIGNUP.link} className="underline">
                        회원가입
                    </Link>
                    <span>|</span>
                    <Link href={URL.FINDPW.link} className="text-dot-gray-dark underline">
                        비밀번호 찾기
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SignInContainer;
