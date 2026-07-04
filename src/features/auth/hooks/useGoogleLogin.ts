'use client';

import { useGoogleLogin as useGoogleOAuth } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Google OAuth login mutation hook.
 * Uses the implicit flow to receive an access_token from Google's popup, then
 * sends it to the backend POST /auth/google as `idToken` for server-side validation.
 * On success, sets auth state in Zustand and redirects to home.
 * @returns Object with `initiateLogin` callback and mutation state.
 */
export const useGoogleLogin = () => {
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const mutation = useMutation({
    mutationFn: async (idToken: string) => await authApi.googleLogin({ idToken }),
    onSuccess: (response) => {
      setCredentials(response.user, response.accessToken);
      router.push('/');
    },
    onError: () => {
      toast.error('Google sign-in failed. Please try again.');
    },
  });

  const initiateLogin = useGoogleOAuth({
    flow: 'implicit',
    onSuccess: (tokenResponse) => {
      mutation.mutate(tokenResponse.access_token);
    },
    onError: () => {
      toast.error('Google sign-in was cancelled or failed.');
    },
  });

  return {
    initiateLogin,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
