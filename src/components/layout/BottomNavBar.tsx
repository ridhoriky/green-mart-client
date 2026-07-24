'use client';

import { Link, usePathname } from '@/libs/I18nNavigation';

const navItems = [
  { href: '/', icon: 'home', label: 'Home' },
  { href: '/products', icon: 'storefront', label: 'Shop' },
  { href: '/cart', icon: 'shopping_cart', label: 'Cart' },
  { href: '/account', icon: 'person', label: 'Account' },
] as const;

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-border-subtle fixed bottom-0 z-50 w-full rounded-t-xl border-t bg-surface-container-lowest shadow-sm md:hidden">
      <div className="pb-safe mx-auto flex h-20 w-full max-w-container-max items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-md px-4 py-1 transition-all duration-200 ${
                isActive
                  ? 'bg-primary-fixed text-primary'
                  : 'text-on-surface-variant hover:text-primary active:scale-90'
              }`}
            >
              <span
                className="material-symbols-outlined"
                data-icon={item.icon}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label-md text-label-md mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
