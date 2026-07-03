'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import type { RegisterRequest } from '@/features/auth/types/auth';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Register mutation hook. On success, saves email to sessionStorage and redirects to verify-email.
 * @returns The useMutation hook result.
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => await authApi.register(data),
    onSuccess: (_response, variables) => {
      sessionStorage.setItem('pending_verification_email', variables.email);
      router.push('/verify-email');
    },
  });
};
