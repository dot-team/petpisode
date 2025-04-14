export const MEMBER_ROLE = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type MemberRole = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];
