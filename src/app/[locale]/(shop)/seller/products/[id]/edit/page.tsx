import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SellerProductEditClient } from '@/features/seller/components/SellerProductEditClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerProducts',
  });

  return {
    title: t('meta_title_edit'),
  };
}

export default async function EditSellerProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations('SellerProducts');

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{t('edit_product')}</h2>
      </div>
      <SellerProductEditClient id={resolvedParams.id} />
    </div>
  );
}
