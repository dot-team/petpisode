import type { UseCustomToastProps } from '@/types';
import { toast } from './useToast';

export const useSuccessToast = ({ title, description }: UseCustomToastProps) => {
    toast({
        title: `${title}`,
        description,
        variant: 'success',
        duration: 3000,
    });
};
