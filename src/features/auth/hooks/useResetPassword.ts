'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import type { ResetPasswordRequest } from '@/features/auth/types/auth';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Reset password mutation hook. On success, redirects to login page.
 * @returns The useMutation hook result.
 */
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => await authApi.resetPassword(data),
    onSuccess: () => {
      router.push('/sign-in');
    },
  });
};
