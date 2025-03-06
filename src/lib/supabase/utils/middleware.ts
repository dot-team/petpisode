import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { ADMIN_PAGE, MEMBER_ROLE, USER_PAGE } from '@/constants';
import getSupabaseEnv from './getSupabaseEnv';
import getUserRole from './getUserRole';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const { SUPABASE_URL, SUPABASE_ANON_KEY } = getSupabaseEnv();

    const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                supabaseResponse = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options),
                );
            },
        },
    });

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userRole = user?.id ? await getUserRole(user.id) : null;

    const matchersForAuth = [`${USER_PAGE.MYPAGE.link}{/*path}`];
    const matchersForAdmin = [`${ADMIN_PAGE.DASHBOARD.link}{/*path}`];
    const matchersForAfterLogin = [
        `${USER_PAGE.LOGIN.link}{/*path}`,
        USER_PAGE.SIGNUP.link,
        USER_PAGE.FINDPW.link,
    ];

    // 경로 일치 확인!
    const isMatch = (pathname: string, urls: string[]) => urls.some(url => !!match(url)(pathname));

    // 로그인하지 않았거나 role이 admin이 아닌 경우 어드민 차단
    if (
        (!user || userRole !== MEMBER_ROLE.ADMIN) &&
        isMatch(request.nextUrl.pathname, matchersForAdmin)
    ) {
        return NextResponse.redirect(new URL(USER_PAGE.SIGNUP.link, request.url));
    }

    // 로그인하지 않고, 인증 필요 페이지 접속 차단
    if (!user && isMatch(request.nextUrl.pathname, matchersForAuth)) {
        return NextResponse.redirect(new URL(USER_PAGE.SIGNUP.link, request.url));
    }

    // 로그인 후 접속 불가능한 페이지 차단
    if (user && isMatch(request.nextUrl.pathname, matchersForAfterLogin)) {
        return NextResponse.redirect(new URL(USER_PAGE.HOME.link, request.url));
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}
