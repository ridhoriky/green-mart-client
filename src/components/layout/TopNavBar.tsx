'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useCartQuery } from '@/features/cart';
import { Link, usePathname, useRouter } from '@/libs/I18nNavigation';

export const TopNavBar = () => {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { data: cartData } = useCartQuery();
  const cartCount = isAuthenticated ? (cartData?.total_items ?? 0) : 0;

  const handleProtectedAction = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push('/sign-in');
    }
  };

  const navLinks = [
    { name: t('categories'), href: '/categories' },
    { name: t('flash_sale'), href: '/flash-sale' },
    { name: t('deals'), href: '/deals' },
    { name: t('about_us'), href: '/about' },
  ];

  return (
    <nav className="glass-header fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/80 shadow-sm">
      <div className="mx-auto flex max-w-container-max items-center justify-between gap-gutter px-margin-mobile py-stack-sm md:px-margin-desktop">
        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 font-headline-lg text-headline-lg font-bold text-primary"
        >
          <Image
            src="/assets/images/logo.png"
            alt="GreenMart Logo"
            width={120}
            height={40}
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="group relative hidden max-w-xl flex-1 md:flex">
          <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full rounded-lg border-transparent bg-surface-container-low py-2 pr-4 pl-12 font-body-sm text-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t('search_placeholder')}
            aria-label={t('search_placeholder')}
            type="text"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 pb-1 font-label-bold text-label-bold transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleProtectedAction('/cart');
            }}
            aria-label={t('shopping_cart')}
            className="group relative hidden rounded-full md:flex"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleProtectedAction('/notifications');
            }}
            aria-label={t('notifications')}
            className="rounded-full"
          >
            <span className="material-symbols-outlined">notifications</span>
          </Button>
          <div className="mx-1 hidden h-8 w-px bg-outline-variant md:block" />

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-linear-to-tr from-primary to-secondary font-bold text-white shadow-md transition-all select-none hover:scale-105 active:scale-95"
              >
                {user?.name?.charAt(0).toUpperCase() ?? 'U'}
              </button>

              {isOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-40 h-full w-full cursor-default border-0 bg-transparent p-0"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-56 animate-fade-in-up rounded-xl border border-outline-variant bg-surface-container-lowest p-2 shadow-xl">
                    <div className="px-3 py-2 font-body-sm text-body-sm text-on-surface">
                      <p className="font-title-sm text-title-sm truncate font-bold">{user?.name}</p>
                      <p className="truncate text-[12px] text-secondary">{user?.email}</p>
                      <span className="mt-1 inline-block rounded-full bg-secondary-container px-2.5 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
                        {user?.role}
                      </span>
                    </div>

                    <div className="my-1 border-t border-outline-variant" />

                    <Link
                      href="/account"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-label-bold text-label-bold text-on-surface transition-colors hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      {t('my_account')}
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      disabled={isLoggingOut}
                      className="w-full justify-start gap-2 text-error hover:bg-error/10 hover:text-error"
                    >
                      {isLoggingOut ? (
                        <span className="material-symbols-outlined animate-spin text-[18px]">
                          progress_activity
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                      )}
                      {t('sign_out')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'gap-2 rounded-full',
                })}
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                {t('sign_in')}
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ variant: 'primary', className: 'gap-2 rounded-full' })}
              >
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                {t('sign_up')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
