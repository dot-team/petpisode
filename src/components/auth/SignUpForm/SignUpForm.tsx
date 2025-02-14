'use client';

import Link from 'next/link';
import { useSignupForm, type SignupFormType } from '@/hooks/useSignupForm';
import {
    Button,
    Input,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components';

export default function SignupForm() {
    const { form, isLoading, onSubmit, handleAllAgreements } = useSignupForm();

    const {
        formState: { errors },
    } = form;

    const allAgreements = form.watch([
        'agreeService',
        'agreePrivacy',
        'agreeEmailNews',
        'agreeWebPushNews',
    ]);
    const isAllAgreed = allAgreements.every(Boolean);

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-sm text-dot-gray-dark">
                    펫피소드를 원활히 이용하기 위해 회원가입을 해주세요
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>아이디 (이메일)</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>닉네임</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>비밀번호 확인</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="all"
                                checked={isAllAgreed}
                                onCheckedChange={checked => handleAllAgreements(checked as boolean)}
                            />
                            <FormLabel htmlFor="all" className="font-semibold">
                                전체 동의
                            </FormLabel>
                        </div>

                        <div className="ml-6 space-y-2">
                            {[
                                { key: 'agreeService', label: '서비스 이용약관 동의 (필수)' },
                                { key: 'agreePrivacy', label: '개인정보 수집 및 이용 동의 (필수)' },
                                {
                                    key: 'agreeEmailNews',
                                    label: '이메일 뉴스레터 구독 여부 (선택)',
                                },
                                {
                                    key: 'agreeWebPushNews',
                                    label: '웹 푸시 뉴스레터 구독 여부 (선택)',
                                },
                            ].map(({ key, label }) => (
                                <FormField
                                    key={key}
                                    control={form.control}
                                    name={key as keyof SignupFormType}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value as boolean}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel htmlFor={key}>{label}</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        {(errors.agreeService || errors.agreePrivacy) && (
                            <p className="text-sm text-danger">{errors.agreeService?.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? '회원가입 중...' : '회원가입'}
                    </Button>
                </form>
            </Form>

            <div className="flex items-center gap-2 text-sm text-center">
                <span>이미 계정이 있으신가요?</span>
                <Link className="text-sm underline" href="/login">
                    로그인
                </Link>
            </div>
        </div>
    );
}
