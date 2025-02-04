import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'node_modules/class-variance-authority/dist';

const inputVariants = cva(
    'flex h-9 w-full border bg-white text-dot-black rounded-dot-s px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-dot-gray-light focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-area-gray disabled:text-dot-gray-dark md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
    {
        variants: {
            variant: {
                primary:
                    'border-primary focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
                secondary:
                    'border-secondary focus-visible:ring-secondary dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
                admin: 'border-zinc-700 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
