import React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from '@/hooks';

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-[0.8rem] text-zinc-500 dark:text-zinc-400', className)}
            {...props}
        />
    );
});
FormDescription.displayName = 'FormDescription';

export { FormDescription };
