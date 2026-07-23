'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useMyStoreQuery } from '@/features/seller/hooks/useSellerStore';
import { Link, usePathname } from '@/libs/I18nNavigation';

export function SellerSidebar(props: { children: React.ReactNode }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const { data: storeData } = useMyStoreQuery();

  // Skip sidebar layout for registration page
  if (pathname.includes('/seller/register')) {
    return <>{props.children}</>;
  }

  const navItems = [
    {
      href: '/seller/dashboard',
      label: t('seller_dashboard'),
      icon: 'dashboard',
    },
    {
      href: '/seller/products',
      label: t('seller_products'),
      icon: 'inventory_2',
    },
    {
      href: '/seller/orders',
      label: t('seller_orders'),
      icon: 'shopping_bag',
    },
    {
      href: '/seller/store',
      label: t('seller_store'),
      icon: 'store',
    },
  ];

  return (
    <div className="min-h-screen bg-surface px-margin-mobile py-6 md:px-margin-desktop md:py-8">
      <div className="mx-auto flex max-w-container-max flex-col gap-6 lg:flex-row">
        {/* Desktop & Mobile Sidebar Navigation */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="sticky top-20 flex flex-col rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
            {/* Store Header Info */}
            <div className="mb-4 flex items-center gap-3 border-b border-outline-variant pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                {storeData?.store_name ? (
                  storeData.store_name.charAt(0).toUpperCase()
                ) : (
                  <span className="material-symbols-outlined text-[24px]">storefront</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-title-sm text-title-sm truncate font-bold text-on-surface">
                    {storeData?.store_name ?? user?.name ?? 'Toko Saya'}
                  </p>
                  {storeData?.is_verified && (
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      verified
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-on-surface-variant">
                  {user?.email ?? 'Seller Panel'}
                </p>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-x-visible">
              <div className="flex w-full gap-1.5 lg:flex-col">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/seller/dashboard' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="min-w-0 flex-1">{props.children}</main>
      </div>
    </div>
  );
}
