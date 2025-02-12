'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupWithEmailPassword } from '@/lib/supabase/actions';
import { useRouter } from 'next/navigation';
import { useSuccessToast } from './useSuccessToast';
import { useErrorToast } from './useErrorToast';

const signupSchema = z
    .object({
        email: z.string().email('유효한 이메일 주소를 입력해주세요'),
        nickname: z.string().min(2, '닉네임은 2글자 이상이어야 합니다'),
        password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
        passwordConfirm: z.string(),
        agreeService: z.boolean(),
        agreePrivacy: z.boolean(),
        agreeEmailNews: z.boolean(),
        agreeWebPushNews: z.boolean(),
    })
    .refine(data => data.password === data.passwordConfirm, {
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordConfirm'],
    })
    .refine(data => data.agreeService && data.agreePrivacy, {
        message: '필수 약관에 동의해주세요',
        path: ['agreeService'],
    });

export type SignupFormType = z.infer<typeof signupSchema>;

export function useSignupForm() {
    const router = useRouter();
    const successToast = useSuccessToast;
    const errorToast = useErrorToast;
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            nickname: '',
            password: '',
            passwordConfirm: '',
            agreeService: false,
            agreePrivacy: false,
            agreeEmailNews: false,
            agreeWebPushNews: false,
        },
    });

    const onSubmit = async (data: SignupFormType) => {
        try {
            setIsLoading(true);
            await signupWithEmailPassword(data);

            successToast({
                title: '회원가입 성공',
                description: '회원가입이 완료되었습니다.',
            });

            router.push('/');
        } catch (error) {
            errorToast({
                title: '회원가입 실패',
                description:
                    error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAllAgreements = (checked: boolean) => {
        form.setValue('agreeService', checked);
        form.setValue('agreePrivacy', checked);
        form.setValue('agreeEmailNews', checked);
        form.setValue('agreeWebPushNews', checked);
    };

    return {
        form,
        isLoading,
        onSubmit,
        handleAllAgreements,
    };
}
