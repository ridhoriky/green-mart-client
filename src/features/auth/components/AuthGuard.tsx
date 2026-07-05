'use client';

import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter, usePathname } from '@/libs/I18nNavigation';

/**
 * AuthGuard redirects unauthenticated users to the sign-in page, preserving the target URL.
 * @param props Props object containing children to render if authenticated.
 * @returns The rendered React element or null.
 */
export const AuthGuard = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{props.children}</>;
};
