import type { UseCustomToastProps } from '@/types';
import { toast } from './use-toast';

export const useSuccessToast = ({ title, description }: UseCustomToastProps) => {
    toast({
        title: `✅ ${title}`,
        description,
        variant: 'success',
        duration: 3000,
    });
};
