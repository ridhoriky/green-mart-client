import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SellerOrderListPage } from '@/features/seller/components/SellerOrderListPage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await props.params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerOrdersPage',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function SellerOrdersPage(props: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await props.params;
  setRequestLocale(resolvedParams.locale);

  return (
    <div className="container mx-auto py-8">
      <SellerOrderListPage />
    </div>
  );
}
