'use client';

import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { authApi } from '@/features/auth/api/authApi';
import type { ResendOTPRequest } from '@/features/auth/types/auth';

const COOLDOWN_SECONDS = 60;

/**
 * Resend OTP mutation hook with built-in 60s cooldown timer.
 * @returns An object containing the mutation and cooldown state.
 */
export const useResendOtp = () => {
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    if (cooldown <= 0) {
      return () => {
        // No-op cleanup
      };
    }
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [cooldown]);

  const mutation = useMutation({
    mutationFn: async (data: ResendOTPRequest) => await authApi.resendOtp(data),
    onSuccess: () => {
      setCooldown(COOLDOWN_SECONDS);
    },
  });

  return { ...mutation, cooldown };
};
