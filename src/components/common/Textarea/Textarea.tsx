import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'node_modules/class-variance-authority/dist';

const textareaVariants = cva(
    'flex min-h-[60px] w-full rounded-dot-s border bg-white text-dot-black px-3 py-2 text-base placeholder:text-dot-gray-light focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-area-gray disabled:text-dot-gray-dark md:text-sm dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
    {
        variants: {
            variant: {
                primary:
                    'border-primary focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
                secondary:
                    'border-secondary focus-visible:ring-secondary dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
                admin: 'border-zinc-700 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    asChild?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <textarea
                className={cn(textareaVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
