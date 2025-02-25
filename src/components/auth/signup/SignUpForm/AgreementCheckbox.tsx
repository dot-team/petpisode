'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox, FormControl, FormField, FormItem, FormLabel } from '@/components';
import type { SignupFormType } from '@/hooks/useSignupForm';

interface AgreementCheckboxProps {
    fieldKey: string;
    label: string;
    control: Control<SignupFormType>;
}

function AgreementCheckbox({ fieldKey, label, control }: AgreementCheckboxProps) {
    return (
        <FormField
            control={control}
            name={fieldKey as keyof SignupFormType}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormLabel htmlFor={fieldKey}>{label}</FormLabel>
                </FormItem>
            )}
        />
    );
}

export default React.memo(AgreementCheckbox);
