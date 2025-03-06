import {
    LayoutDashboard,
    User,
    Newspaper,
    BookOpen,
    Speech,
    TriangleAlert,
    Settings,
} from 'lucide-react';
import { type PageUrl, USER_PAGE, ADMIN_PAGE } from './url';

interface NavItem {
    text: string;
    link: PageUrl;
    icon?: React.FC;
    subItems?: { text: string; link: PageUrl }[];
}

const USER_NAV_LIST: NavItem[] = [
    { ...USER_PAGE.HOME },
    { ...USER_PAGE.NEWSLETTER },
    { ...USER_PAGE.EPISODE },
    { ...USER_PAGE.COMMUNITY },
];
const ADMIN_NAV_LIST: NavItem[] = [
    { ...ADMIN_PAGE.DASHBOARD, icon: LayoutDashboard },
    { ...ADMIN_PAGE.MEMBER, icon: User },
    { ...ADMIN_PAGE.NEWSLETTER, icon: Newspaper },
    { ...ADMIN_PAGE.EPISODE, icon: BookOpen },
    { ...ADMIN_PAGE.COMMUNITY, icon: Speech },
    { ...ADMIN_PAGE.REPORT, icon: TriangleAlert },
    { ...ADMIN_PAGE.SETTING, icon: Settings },
];

export { USER_NAV_LIST, ADMIN_NAV_LIST };
