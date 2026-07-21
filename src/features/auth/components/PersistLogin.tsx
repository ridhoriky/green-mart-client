'use client';

import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';

/**
 * PersistLogin component handles silent token refresh when the application first loads.
 * It prevents the child routes from rendering until the auth session is verified.
 * @param props Props object containing children to render once session is loaded.
 * @returns The rendered React element or loading screen.
 */
export const PersistLogin = (props: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const clearCredentials = useAuthStore((state) => state.clearCredentials);

  React.useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await authApi.refreshToken();
        if (isMounted) {
          setCredentials(response.user, response.access_token);
        }
      } catch {
        if (isMounted) {
          clearCredentials();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (accessToken) {
      setIsLoading(false);
    } else {
      void verifyRefreshToken();
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken, setCredentials, clearCredentials]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-on-surface">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-body-md animate-pulse text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
};
