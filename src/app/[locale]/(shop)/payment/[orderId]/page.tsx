import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { PaymentPage } from '@/features/payment';

type PaymentRouteProps = {
  params: Promise<{ locale: string; orderId: string }>;
};

/**
 * Generates dynamic metadata for the Payment Page.
 *
 * @param props - The page props.
 * @returns The page metadata.
 */
export async function generateMetadata(props: PaymentRouteProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'PaymentPage',
  });

  return {
    title: t('meta_title'),
  };
}

/**
 * Renders the payment page protected by the AuthGuard.
 *
 * @param props - The page props.
 * @returns The payment page element.
 */
export default async function ShopPaymentPage(props: PaymentRouteProps) {
  const { locale, orderId } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <PaymentPage orderId={orderId} />
    </AuthGuard>
  );
}
