'use client';

import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { usePathname, useRouter } from '@/libs/I18nNavigation';

/**
 * Protects seller routes by verifying that the user has a seller or admin role.
 * @param props Props object containing children to render.
 * @returns The rendered React element or null.
 */
export const SellerGuard = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isRegisterPage = pathname.includes('/seller/register');
  const isSellerOrAdmin = user?.role === 'seller' || user?.role === 'admin';

  React.useEffect(() => {
    if (isAuthenticated && !isRegisterPage && !isSellerOrAdmin) {
      router.push('/seller/register');
    }
  }, [isAuthenticated, isRegisterPage, isSellerOrAdmin, router]);

  if (!isRegisterPage && (!isAuthenticated || !user || !isSellerOrAdmin)) {
    return null;
  }

  return <>{props.children}</>;
};
