import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { SellerRegistrationForm } from '@/features/seller/components/SellerRegistrationForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'SellerRegisterPage' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SellerRegisterPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-surface px-margin-mobile py-16 md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <SellerRegistrationForm />
        </div>
      </main>
    </AuthGuard>
  );
}
