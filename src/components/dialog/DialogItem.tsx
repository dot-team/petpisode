import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface DialogProps {
    buttonTitle: string;
    title: string;
    description: string;
    sucessMesage: string;
    cancelMessage: string;
    onSucess: () => void;
    onCancel: () => void;
    contentClassName?: string;
    footerClassName?: string;
}

export function DialogItem({
    buttonTitle,
    title,
    description = '',
    sucessMesage = '성공',
    cancelMessage = '취소',
    onSucess,
    onCancel,
    contentClassName,
    footerClassName,
}: DialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button">{buttonTitle}</button>
            </DialogTrigger>
            <DialogContent className={`sm:mx-w-[450px] w-[400px] h-[150px] ${contentClassName}`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter
                    className={`flex items-center justify-center gap-10 ${footerClassName}`}
                >
                    <button onClick={onSucess} type="button">
                        {sucessMesage}
                    </button>
                    <button onClick={onCancel} type="button">
                        {cancelMessage}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

DialogItem.defaultProps = {
    contentClassName: '',
    footerClassName: '',
};

export default DialogItem;
