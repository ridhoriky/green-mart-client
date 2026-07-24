import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { Link } from '@/libs/I18nNavigation';

type AccountDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates dynamic metadata for the Account Dashboard Page.
 * @param props - Page props.
 * @returns Metadata object.
 */
export async function generateMetadata(props: AccountDashboardPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Navigation',
  });

  return {
    title: `${t('my_account')} | GreenMart`,
    description: 'Manage your profile, orders, and wishlist on GreenMart.',
  };
}

/**
 * Renders the user account dashboard page.
 * @param props - Page props.
 * @returns Account dashboard page view.
 */
export default async function AccountDashboardPage(props: AccountDashboardPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <div className="container mx-auto max-w-4xl space-y-8 px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary">My Account</h1>
          <p className="font-body-md text-body-md mt-1 text-on-surface-variant">
            Manage your account details, track orders, and view your saved products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Link
            href="/account/profile"
            className="group flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                User Profile
              </h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                View & edit your name, contact details, and security settings.
              </p>
            </div>
          </Link>

          <Link
            href="/account/orders"
            className="group flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">My Orders</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Track status of active purchases and view historical invoices.
              </p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="group flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">My Wishlist</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                View saved organic products and add them quickly to cart.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
