import BaseContainer from './AdminItemBaseContainer';

interface DetailItem {
    label: string;
    content: React.ReactNode;
}

interface DetailViewContainerProps {
    title: string;
    items: DetailItem[];
    onCancel?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
}

export default function DetailViewContainer({
    title,
    items,
    onCancel,
    onSubmit,
    submitLabel,
}: DetailViewContainerProps) {
    return (
        <BaseContainer
            title={title}
            onCancel={onCancel}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
        >
            <div className="grid gap-6">
                {items.map(item => (
                    <div key={item.label} className="grid gap-1.5">
                        <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                        <dd className="text-sm">{item.content}</dd>
                    </div>
                ))}
            </div>
        </BaseContainer>
    );
}
