import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { OrderDetailPage } from '@/features/orders';

type OrderDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

/**
 * Generates dynamic metadata for the Order Detail Page.
 * @param props - Page props.
 * @returns Metadata object.
 */
export async function generateMetadata(props: OrderDetailPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'OrderDetailPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Renders the order detail page protected by the AuthGuard.
 * @param props - Page props.
 * @returns Order detail page view.
 */
export default async function ShopOrderDetailPage(props: OrderDetailPageProps) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <OrderDetailPage orderId={id} />
    </AuthGuard>
  );
}
