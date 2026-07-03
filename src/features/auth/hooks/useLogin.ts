'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { LoginRequest } from '@/features/auth/types/auth';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Login mutation hook. On success, sets auth state and redirects to home.
 * @returns The useMutation hook result.
 */
export const useLogin = () => {
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: async (data: LoginRequest) => await authApi.login(data),
    onSuccess: (response) => {
      setCredentials(response.user, response.accessToken);
      router.push('/');
    },
  });
};
