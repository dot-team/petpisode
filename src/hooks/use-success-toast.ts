import { toast } from './use-toast';

export const useSuccessToast = ({ title, description }: { title: string; description: string }) => {
    toast({
        title: `✅ ${title}`,
        description,
        variant: 'success',
        duration: 3000,
    });
};
