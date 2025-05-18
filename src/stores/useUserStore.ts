import { COOKIES, API_ROUTES } from '@/globals';
import axios from 'axios';
import { create } from 'zustand';
// @ts-ignore
import Cookies from 'js-cookie';
import { IUserDetails } from '@/app';

function getCookie(name: string): string | null {
  return Cookies.get(name) || null;
}

function deleteCookie(name: string): void {
  Cookies.remove(name);
}

interface UserState {
  user: IUserDetails | null;
  userWasFetched: boolean;
  setUser?: (user: IUserDetails | null) => void;
  setIsUserDataLoading?: (isUserDataLoading: boolean) => void;
  isUserDataLoading: boolean;
  fetchUserData: (locale?: string, options?: {
    disableLoadingState?: boolean;
  }) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  (set, get) => ({
    user: null,
    userWasFetched: false,
    isUserDataLoading: getCookie(COOKIES.CHECK_AUTH) === 'true',
    setUser: (user: IUserDetails | null) => {
      set({ user });
    },
    setIsUserDataLoading: (isUserDataLoading: boolean) => {
      set({ isUserDataLoading });
    },
    fetchUserData: async (locale, disableLoadingState) => {
      !disableLoadingState && set({ isUserDataLoading: true });
      try {
        const resp = await axios.get(API_ROUTES.USER.GET_DATAS);
        // console.log('resp', resp);
        if (resp.status === 200 && resp.data) {
          const userToSet = resp.data?.user;
          set({ user: userToSet });
        } else {
          set({ user: null });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // if (error?.response?.data?.error) {
        //   const errorCode = error?.response?.data?.error?.message?.code;
        //   const errorMessage = error?.response?.data?.error?.message?.text;
        //   if (errorCode === 'no_access_token_found') {
        //     deleteCookie(COOKIES.CHECK_AUTH);
        //   }
        // }
        set({ user: null });
      } finally {
        set({ isUserDataLoading: false });
        set({ userWasFetched: true });
      }
    },
  }),
);
