import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SellerProductForm } from '@/features/seller/components/SellerProductForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerProducts',
  });

  return {
    title: t('meta_title_new'),
  };
}

export default async function NewSellerProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations('SellerProducts');

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{t('add_product')}</h2>
      </div>
      <SellerProductForm />
    </div>
  );
}
