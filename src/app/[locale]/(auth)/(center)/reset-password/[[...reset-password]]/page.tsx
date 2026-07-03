import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResetPasswordForm } from '@/features/auth';

type ResetPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ResetPasswordPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ResetPassword',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ResetPasswordPage(props: ResetPasswordPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ResetPasswordForm />;
}
