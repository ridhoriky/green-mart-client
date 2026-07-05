'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * GuestGuard redirects authenticated users away from visitor-only pages.
 * @param props Props object containing children to render if guest.
 * @returns The rendered React element.
 */
export const GuestGuard = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect');
      const safeRedirect =
        redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';
      router.push(safeRedirect);
    }
  }, [isAuthenticated, router, searchParams]);

  if (isAuthenticated) {
    return null;
  }

  return <>{props.children}</>;
};
