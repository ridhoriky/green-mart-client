import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SellerStorePage } from '@/features/seller/components/SellerStorePage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await props.params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'SellerStorePage',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function SellerStoreSettingsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await props.params;
  setRequestLocale(resolvedParams.locale);

  return (
    <div className="container mx-auto py-8">
      <SellerStorePage />
    </div>
  );
}
