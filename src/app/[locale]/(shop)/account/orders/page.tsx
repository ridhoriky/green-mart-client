import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { OrdersPage } from '@/features/orders';

type OrdersPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates dynamic metadata for the Orders Page.
 * @param props - Page props.
 * @returns Metadata object.
 */
export async function generateMetadata(props: OrdersPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'OrdersPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Renders the user orders page protected by the AuthGuard.
 * @param props - Page props.
 * @returns Orders page view.
 */
export default async function ShopOrdersPage(props: OrdersPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <OrdersPage />
    </AuthGuard>
  );
}
