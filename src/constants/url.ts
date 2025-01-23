type Url = Record<string, { text: string; link: string }>;

/**
 * 네비게이션에 필요한 url 객체
 * key 값은 복잡성을 줄이기 위해 다른 상수로 만들지 않음
 * @return Url
 */
const URL: Url = {
    HOME: { text: '홈', link: '/' },
    LOGIN: { text: '로그인', link: '/login' },
    SIGNUP: { text: '회원가입', link: '/signup' },
    FINDPW: { text: '비밀번호 찾기', link: '/findpw' },
    NEWSLETTER: { text: '뉴스레터', link: '/newsletter' },
    EPISODE: { text: '사연제보', link: '/episode' },
    COMMUNITY: { text: '커뮤니티', link: '/community' },
    MYPAGE: { text: '마이페이지', link: '/userinfo' },
} as const;

export { URL };
