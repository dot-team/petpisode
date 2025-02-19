import Link from 'next/link';
import { Button, Input, Label } from '@/components';
import { URL } from '@/constants';

function EmailLoginForm() {
    return (
        <>
            <form className="w-full space-y-l mt-7">
                <div className="space-y-4">
                    <div className="space-y-xs">
                        <Label htmlFor="email">아이디 (이메일)</Label>
                        <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                    </div>

                    <div className="space-y-xs">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">비밀번호</Label>
                            <Link
                                href={URL.FINDPW.link}
                                className="text-xs text-dot-gray-dark underline"
                            >
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
                <Link href={URL.SIGNUP.link} className="underline">
                    회원가입
                </Link>
            </div>
        </>
    );
}

export default EmailLoginForm;
