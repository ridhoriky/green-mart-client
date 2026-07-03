'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import type { VerifyEmailRequest } from '@/features/auth/types/auth';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Verify email mutation hook. On success, redirects to success page.
 * @returns The useMutation hook result.
 */
export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => await authApi.verifyEmail(data),
    onSuccess: () => {
      sessionStorage.removeItem('pending_verification_email');
      router.push('/verify-email/success');
    },
  });
};
