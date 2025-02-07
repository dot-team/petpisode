import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-dot-white hover:bg-primary-dark dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 rounded-md disabled:bg-area-gray disabled:text-dot-gray-dark',
                error: 'bg-danger text-dot-white hover:bg-danger-dark dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90 disabled:bg-area-gray disabled:text-dot-gray-dark',
                primaryOutline:
                    'border border-primary bg-white text-primary hover:bg-primary hover:text-dot-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
                secondary:
                    'bg-secondary text-dot-white hover:bg-secondary-dark dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 disabled:bg-area-gray disabled:text-dot-gray-dark',
                secondaryOutline:
                    'border border-secondary bg-white text-secondary hover:bg-secondary hover:text-dot-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
                admin: 'bg-zinc-700 text-dot-white hover:bg-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 disabled:bg-area-gray disabled:text-dot-gray-dark',
                adminOutline:
                    'border border-zinc-700 bg-white text-dot-black hover:bg-zinc-700 hover:text-dot-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:border-area-gray disabled:text-dot-gray-dark',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-dot-s px-3 text-xs',
                lg: 'h-10 rounded-dot-l px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, onClick, disabled = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onClick={onClick}
                disabled={disabled}
                {...props}
            />
        );
    },
);

Button.defaultProps = {
    asChild: false,
};

Button.displayName = 'Button';

export { Button, buttonVariants };
