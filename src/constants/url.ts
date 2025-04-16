type PageUrl =
    | '/'
    | '/login'
    | '/signup'
    | '/findpw'
    | '/newsletter'
    | '/episode'
    | '/community'
    | '/userinfo'
    | '/admin'
    | '/admin/member'
    | '/admin/newsletter'
    | '/admin/newsletter/collect'
    | '/admin/newsletter/publish'
    | '/admin/episode'
    | '/admin/community'
    | '/admin/report'
    | '/admin/setting';

type PageInfo = Record<
    string,
    { text: string; link: PageUrl; subItems?: { text: string; link: PageUrl }[] }
>;

/**
 * 네비게이션에 필요한 page 객체
 * key 값은 복잡성을 줄이기 위해 다른 상수로 만들지 않음
 * 사용자 사이트 페이지
 */
const USER_PAGE = {
    HOME: { text: '홈', link: '/' },
    LOGIN: { text: '로그인', link: '/login' },
    SIGNUP: { text: '회원가입', link: '/signup' },
    FINDPW: { text: '비밀번호 찾기', link: '/findpw' },
    NEWSLETTER: { text: '뉴스레터', link: '/newsletter' },
    EPISODE: { text: '사연제보', link: '/episode' },
    COMMUNITY: { text: '커뮤니티', link: '/community' },
    MYPAGE: { text: '마이페이지', link: '/userinfo' },
} as const satisfies PageInfo;

/**
 * 관리자 사이트 페이지
 */
const ADMIN_PAGE = {
    DASHBOARD: { text: '대시보드', link: '/admin' },
    MEMBER: { text: '회원관리', link: '/admin/member' },
    NEWSLETTER: {
        text: '뉴스레터',
        link: '/admin/newsletter',
        subItems: [
            { text: '목록', link: '/admin/newsletter' },
            { text: '수집', link: '/admin/newsletter/collect' },
            { text: '게시 및 발송', link: '/admin/newsletter/publish' },
        ],
    },
    EPISODE: { text: '사연제보', link: '/admin/episode' },
    COMMUNITY: { text: '커뮤니티', link: '/admin/community' },
    REPORT: { text: '신고관리', link: '/admin/report' },
    SETTING: { text: '설정', link: '/admin/setting' },
} as const satisfies PageInfo;

export { type PageUrl, USER_PAGE, ADMIN_PAGE };
