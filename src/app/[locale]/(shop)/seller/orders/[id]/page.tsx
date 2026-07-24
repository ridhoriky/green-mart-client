import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SellerOrderDetailPage as SellerOrderDetailView } from '@/features/seller/components/SellerOrderDetailPage';

export async function generateMetadata(props: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = await props.params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerOrderDetailPage',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function SellerOrderDetailPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await props.params;
  setRequestLocale(resolvedParams.locale);

  return (
    <div className="container mx-auto py-8">
      <SellerOrderDetailView orderId={resolvedParams.id} />
    </div>
  );
}
