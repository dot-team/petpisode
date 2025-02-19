import { Dialog, DialogContent, DialogTitle } from '@/components';
import SignInContainer from '../SignInContainer/SignInContainer';

interface LoginDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

function LoginDialog({ isOpen, onOpenChange }: LoginDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle hidden>로그인</DialogTitle>
                <SignInContainer />
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;
