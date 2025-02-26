import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { UserInfo } from '@/types';

interface UserState {
    user: UserInfo | null;
    isUserLoading: boolean;
}

interface UserActions {
    actions: {
        setUser: (user: Partial<UserInfo> | null) => void;
        clearUser: () => void;
        setUserLoading: (isUserLoading: boolean) => void;
    };
}

type UserStore = UserState & UserActions;

// user 액션 이름
const USER_ACTION_PREFIX = 'user/';
const USER_ACTION_NAME = {
    SET_USER: `${USER_ACTION_PREFIX}setUser`,
    CLEAR_USER: `${USER_ACTION_PREFIX}clearUser`,
    SET_LOADING: `${USER_ACTION_PREFIX}setUserLoading`,
} as const;

// 초기 user 상태
const initialState: UserState = { user: null, isUserLoading: false };

// userStore 생성
export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            immer(set => ({
                ...initialState,
                actions: {
                    setUser: userData =>
                        set(
                            state => {
                                if (userData === null) {
                                    state.user = null;
                                } else {
                                    state.user = state.user
                                        ? { ...state.user, ...userData }
                                        : (userData as UserInfo);
                                }
                            },
                            false,
                            USER_ACTION_NAME.SET_USER,
                        ),
                    clearUser: () => set(initialState, false, USER_ACTION_NAME.CLEAR_USER),
                    setUserLoading: isUserLoading =>
                        set({ isUserLoading }, false, USER_ACTION_NAME.SET_LOADING),
                },
            })),
            {
                name: 'user-storage',
                partialize: state => ({
                    user: state.user
                        ? {
                              email: state.user.email,
                              nickname: state.user.nickname,
                              role: state.user.role,
                              profile_image_url: state.user.profile_image_url,
                          }
                        : null,
                }),
            },
        ),
    ),
);

// 액션 selector
export const useUserActions = () => useUserStore(state => state.actions);

export const useUser = () => useUserStore(state => state.user); // user selector
export const useUserEmail = () => useUserStore(state => state.user?.email); // email selector
export const useUserRole = () => useUserStore(state => state.user?.role); // role selector
export const useUserNickname = () => useUserStore(state => state.user?.nickname); // nickname selector
export const useUserImg = () => useUserStore(state => state.user?.profile_image_url); // profile_image_url selector
export const useUserLoading = () => useUserStore(state => state.isUserLoading); // isUserLoading selector
