import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
// import Image from 'next/image';

interface DialogProps {
    buttonTitle: string;
    title: string;
    description: string;
    sucessMesage: string;
    cancelMessage: string;
    onSucess: () => void;
    onCancel: () => void;
}

export function DialogItem({
    buttonTitle,
    title,
    description = '',
    sucessMesage = '성공',
    cancelMessage = '취소',
    onSucess,
    onCancel,
}: DialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button">{buttonTitle}</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div>{/* <Image /> */}</div>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
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

export default DialogItem;
