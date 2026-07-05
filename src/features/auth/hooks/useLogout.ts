'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Logout mutation hook. On success/error, clears auth state and redirects to sign-in.
 * @returns The useMutation hook result.
 */
export const useLogout = () => {
  const router = useRouter();
  const clearCredentials = useAuthStore((state) => state.clearCredentials);

  return useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess: () => {
      clearCredentials();
      router.push('/sign-in');
    },
    onError: () => {
      // Clear credentials even if backend request fails
      clearCredentials();
      router.push('/sign-in');
    },
  });
};
