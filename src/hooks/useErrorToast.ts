import type { UseCustomToastProps } from '@/types';
import { toast } from './usetoast';

export const useErrorToast = ({ title, description }: UseCustomToastProps) => {
    toast({
        title: `${title}`,
        description,
        variant: 'error',
        duration: 3000,
    });
};
