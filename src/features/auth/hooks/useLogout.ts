'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Logout mutation hook. On success/error, clears auth state, resets query cache, and redirects to sign-in.
 * @returns The useMutation hook result.
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCredentials = useAuthStore((state) => state.clearCredentials);

  return useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      clearCredentials();
      router.push('/sign-in');
    },
    onError: () => {
      // Clear credentials and query cache even if backend request fails
      queryClient.clear();
      clearCredentials();
      router.push('/sign-in');
    },
  });
};
