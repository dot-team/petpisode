import { toast } from './use-toast';

export const useErrorToast = ({ title, description }: { title: string; description: string }) => {
    toast({
        title: `❌ ${title}`,
        description,
        variant: 'error',
        duration: 3000,
    });
};
