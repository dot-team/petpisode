export const normalizeEmptyToNull = (value: string | undefined): string | null => {
    return value && value.trim() !== '' ? value : null;
};
