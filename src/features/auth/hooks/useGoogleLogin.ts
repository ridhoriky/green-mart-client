'use client';

import type { CredentialResponse } from '@react-oauth/google';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Google OAuth login mutation hook.
 * Accepts a Google ID Token (JWT) from Google's credential response, then
 * sends it to the backend POST /auth/google as `idToken` for server-side validation.
 * On success, clears old query cache, sets auth state in Zustand and redirects to home.
 * @returns Object with `handleGoogleSuccess` callback and mutation state.
 */
export const useGoogleLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const mutation = useMutation({
    mutationFn: async (idToken: string) => await authApi.googleLogin({ id_token: idToken }),
    onSuccess: (response) => {
      queryClient.clear();
      setCredentials(response.user, response.access_token);
      router.push('/');
    },
    onError: () => {
      toast.error('Google sign-in failed. Please try again.');
    },
  });

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      mutation.mutate(credentialResponse.credential);
    } else {
      toast.error('Google sign-in failed: No credentials returned.');
    }
  };

  return {
    handleGoogleSuccess,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
