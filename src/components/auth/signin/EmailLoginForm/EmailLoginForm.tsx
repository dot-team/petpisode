'use client';

import { FormEvent } from 'react';
import Link from 'next/link';
import { Input, Label } from '@/components';
import { URL } from '@/constants';
import { useAuth, useErrorToast, useSuccessToast } from '@/hooks';
import LoginSubmitButton from './LoginSubmitButton';

function EmailLoginForm() {
    const { handleEmailLogin, isUserLoading } = useAuth();
    const successToast = useSuccessToast;
    const errorToast = useErrorToast;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { errors } = await handleEmailLogin(email, password);

        if (errors) {
            errorToast({
                title: '로그인 실패',
                description:
                    errors instanceof Error ? errors.message : '로그인 중 오류가 발생했습니다.',
            });
        } else {
            successToast({
                title: '로그인 성공',
                description: '로그인이 완료되었습니다.',
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="space-y-4">
                    <div className="space-y-xs">
                        <Label htmlFor="email">아이디 (이메일)</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="이메일을 입력하세요"
                            required
                        />
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
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>
                </div>

                <LoginSubmitButton isPending={isUserLoading} />
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
