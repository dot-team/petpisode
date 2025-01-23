import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';

interface BaseContainerProps {
    title: string;
    children: React.ReactNode;
    onCancel?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
}

export default function BaseContainer({
    title,
    children,
    onCancel,
    onSubmit,
    submitLabel = '반영하기',
}: BaseContainerProps) {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <Card className="relative">
                <div className="p-6">{children}</div>
                <div className="flex items-center justify-center gap-2 p-4">
                    <Button variant="outline" onClick={onCancel}>
                        취소
                    </Button>
                    <Button onClick={onSubmit}>{submitLabel}</Button>
                </div>
            </Card>
        </div>
    );
}
