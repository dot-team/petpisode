import BaseContainer from './AdminItemBaseContainer';

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
    onCancel?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
}

export default function FormContainer({
    title,
    children,
    onCancel,
    onSubmit,
    submitLabel,
}: FormContainerProps) {
    return (
        <BaseContainer
            title={title}
            onCancel={onCancel}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
        >
            <form
                className="grid gap-6"
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit?.();
                }}
            >
                {children}
            </form>
        </BaseContainer>
    );
}
