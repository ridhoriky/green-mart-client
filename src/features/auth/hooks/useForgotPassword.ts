'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import type { ForgotPasswordRequest } from '@/features/auth/types/auth';

/**
 * Hook for forgot password mutation.
 * @returns The useMutation result for requesting a password reset link.
 */
export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => await authApi.forgotPassword(data),
  });
