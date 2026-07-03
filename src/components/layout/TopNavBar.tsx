'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TopNavBar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Categories', href: '/categories' },
    { name: 'Flash Sale', href: '/flash-sale' },
    { name: 'Deals', href: '/deals' },
    { name: 'About Us', href: '/about' },
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
            placeholder="Search vegetables, fruits, rice, farmers..."
            aria-label="Search vegetables, fruits, rice, farmers"
            type="text"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname.replace(/^\/(en|id)/u, '') === link.href;
            return (
              <Link
                key={link.name}
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
          <button
            type="button"
            aria-label="Shopping Cart"
            className="group relative hidden rounded-full p-2 transition-all hover:bg-surface-container-low active:scale-95 md:block"
          >
            <span className="material-symbols-outlined text-on-surface-variant">shopping_cart</span>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              3
            </span>
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 transition-all hover:bg-surface-container-low active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
          <div className="mx-1 hidden h-8 w-[1px] bg-outline-variant md:block" />
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 font-label-bold text-label-bold text-primary transition-all hover:bg-primary/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-2 rounded-full border border-transparent bg-primary px-4 py-2 font-label-bold text-label-bold text-white transition-all hover:bg-primary/90 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
