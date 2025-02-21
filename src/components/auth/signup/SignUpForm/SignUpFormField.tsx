'use client';

import type { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components';
import { SignupFormType } from '@/hooks/useSignupForm';

type InputFormFieldNames = 'email' | 'nickname' | 'password' | 'passwordConfirm';

interface SignUpFormFieldProps {
    control: Control<SignupFormType>;
    name: InputFormFieldNames;
    label: string;
    type?: string;
}

function SignUpFormField({ control, name, label, type = 'text' }: SignUpFormFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SignUpFormField;
