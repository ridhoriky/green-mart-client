import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { SellerDashboard } from '@/features/seller/components/SellerDashboard';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'SellerDashboard' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SellerDashboardPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-surface px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <div className="mx-auto max-w-container-max">
          <SellerDashboard />
        </div>
      </main>
    </AuthGuard>
  );
}
