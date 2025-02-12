'use client';

import React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    ...props
}: ControllerProps<TFieldValues, TName>) {
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

export { FormField, FormFieldContext };
