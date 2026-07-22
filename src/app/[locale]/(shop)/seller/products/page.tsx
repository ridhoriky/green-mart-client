import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SellerProductListPage } from '@/features/seller/components/SellerProductListPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerProducts',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function SellerProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <div className="container mx-auto py-8">
      <SellerProductListPage />
    </div>
  );
}
