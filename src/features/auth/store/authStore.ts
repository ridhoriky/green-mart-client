import { create } from 'zustand';
import type { UserResponse } from '@/features/auth/types/auth';

type AuthState = {
  user: UserResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  /** Set user + access token after successful login/register. */
  setCredentials: (user: UserResponse, accessToken: string) => void;
  /** Update only the access token (e.g. after a silent refresh). */
  setAccessToken: (accessToken: string) => void;
  /** Clear all auth state on logout. */
  clearCredentials: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setCredentials: (user, accessToken) => {
    set({ user, accessToken, isAuthenticated: true });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearCredentials: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));
