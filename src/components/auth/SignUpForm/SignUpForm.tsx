'use client';

import { useMemo } from 'react';
import { useSignupForm } from '@/hooks/useSignupForm';
import { Button, Checkbox, Form, FormLabel } from '@/components';
import { AGREEMENT_PROPS } from '@/constants';
import AgreementCheckbox from './AgreementCheckbox';
import SignUpFormField from './SignUpFormField';

export default function SignupForm() {
    const { form, onSubmit, handleAllAgreements } = useSignupForm();

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        control,
        watch,
    } = form;

    const agreeService = watch('agreeService');
    const agreePrivacy = watch('agreePrivacy');
    const agreeEmailNews = watch('agreeEmailNews');
    const agreeWebPushNews = watch('agreeWebPushNews');

    const isAllAgreed = useMemo(
        () => agreeService && agreePrivacy && agreeEmailNews && agreeWebPushNews,
        [agreeService, agreePrivacy, agreeEmailNews, agreeWebPushNews],
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
                <SignUpFormField
                    control={control}
                    name="email"
                    label="아이디 (이메일)"
                    type="email"
                />

                <SignUpFormField control={control} name="nickname" label="닉네임" />

                <SignUpFormField
                    control={control}
                    name="password"
                    label="비밀번호"
                    type="password"
                />

                <SignUpFormField
                    control={control}
                    name="passwordConfirm"
                    label="비밀번호 확인"
                    type="password"
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
                        {AGREEMENT_PROPS.map(({ key, label }) => (
                            <AgreementCheckbox
                                key={key}
                                fieldKey={key}
                                label={label}
                                control={control}
                            />
                        ))}
                    </div>
                    {(errors.agreeService || errors.agreePrivacy) && (
                        <p className="text-sm text-danger">{errors.agreeService?.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? '회원가입 중...' : '회원가입'}
                </Button>
            </form>
        </Form>
    );
}
