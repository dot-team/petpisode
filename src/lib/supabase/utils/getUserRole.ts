import { MEMBER_ROLE, MemberRole } from '@/constants';
import { fetchDataByIdFromServer } from '@/services';
import { TableData } from '@/types';

export default async function getUserRole(userId: string) {
    try {
        const [userData] = (await fetchDataByIdFromServer(
            'users',
            'user_id',
            userId,
        )) as TableData<'users'>[];
        return userData.role as MemberRole;
    } catch (error) {
        return MEMBER_ROLE.USER;
    }
}
