import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
    'peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-zinc-50 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:text-zinc-900',
    {
        variants: {
            variant: {
                primary:
                    'border-primary focus-visible:ring-primary data-[state=checked]:bg-primary dark:border-zinc-800 dark:bg-zinc-950 dark:data-[state=checked]:bg-primary',
                secondary:
                    'border-secondary focus-visible:ring-secondary data-[state=checked]:bg-secondary dark:border-zinc-800 dark:bg-zinc-950 dark:data-[state=checked]:bg-secondary',
                admin: 'border-zinc-700 focus-visible:ring-zinc-900 data-[state=checked]:bg-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:data-[state=checked]:bg-zinc-700',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
        VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    ({ className, variant, ...props }, ref) => (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(checkboxVariants({ variant, className }))}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('flex items-center justify-center text-current')}
            >
                <Check className="h-3 w-3" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
