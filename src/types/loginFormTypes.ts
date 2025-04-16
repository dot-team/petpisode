export type LoginFormState = {
    errors?: {
        email?: string[];
        password?: string[];
        general?: string[];
    };
    success?: boolean;
    userRole?: string;
};
