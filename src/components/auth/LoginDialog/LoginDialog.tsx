'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components';
import { EmailLogin, SocialLogin } from '../common';

interface LoginDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

function LoginDialog({ isOpen, onOpenChange }: LoginDialogProps) {
    const [isEmailLogin, setIsEmailLogin] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle hidden>로그인</DialogTitle>
                {isEmailLogin ? (
                    <EmailLogin />
                ) : (
                    <SocialLogin onClickEmailLogin={setIsEmailLogin} />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;
