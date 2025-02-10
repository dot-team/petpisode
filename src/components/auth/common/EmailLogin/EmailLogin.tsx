import Link from 'next/link';
import Image from 'next/image';
import { Button, Input, Label } from '@/components';
import Logo from '/public/images/logo.svg';

function EmailLogin() {
    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
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

            <form className="w-full space-y-l mt-7">
                <div className="space-y-4">
                    <div className="space-y-xs">
                        <Label htmlFor="email">아이디 (이메일)</Label>
                        <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                    </div>

                    <div className="space-y-xs">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">비밀번호</Label>
                            <Link href="/findpw" className="text-xs text-dot-gray-dark underline">
                                비밀번호를 잊으셨나요?
                            </Link>
                        </div>
                        <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
                    </div>
                </div>

                <Button type="submit" className="w-full space-l" size="lg">
                    Login
                </Button>
            </form>

            <div className="flex items-center gap-1 text-sm mt-3">
                <span>계정이 없으신가요?</span>
                <Link href="/signup" className="underline">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

export default EmailLogin;
