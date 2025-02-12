'use client';

import { Button, Input, Label, Checkbox } from '@/components';

export function SignupForm() {
    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-sm text-dot-gray-dark">
                    펫피소드를 원활히 이용하기 위해 회원가입을 해주세요
                </p>
            </div>

            <form className="w-full space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">아이디 (이메일)</Label>
                        <div className="flex gap-2">
                            <Input id="email" type="email" required />
                            <Button type="button">인증메일 발송</Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="verificationCode">인증번호</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input id="verificationCode" required />
                            </div>
                            <Button type="button">인증하기</Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nickname">닉네임</Label>
                        <Input id="nickname" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" type="password" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                        <Input id="passwordConfirm" type="password" required />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="all" />
                            <Label htmlFor="all" className="font-semibold">
                                전체 동의
                            </Label>
                        </div>

                        <div className="ml-6 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="service" />
                                <Label htmlFor="service">서비스 이용약관 동의 (필수)</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="privacy" />
                                <Label htmlFor="privacy">개인정보 수집 및 이용 동의 (필수)</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="emailNews" />
                                <Label htmlFor="emailNews">이메일 뉴스레터 구독 여부 (선택)</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="webPushNews" />
                                <Label htmlFor="webPushNews">
                                    웹 푸시 뉴스레터 구독 여부 (선택)
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                    회원가입
                </Button>
            </form>
        </div>
    );
}
