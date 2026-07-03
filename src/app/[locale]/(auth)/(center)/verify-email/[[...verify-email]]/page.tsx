import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { VerifyEmailForm, VerifyEmailSuccess } from '@/features/auth';

type VerifyEmailPageProps = {
  params: Promise<{ locale: string; 'verify-email'?: string[] }>;
};

export async function generateMetadata(props: VerifyEmailPageProps): Promise<Metadata> {
  const { locale, 'verify-email': verifyEmailParams } = await props.params;
  const isSuccess = verifyEmailParams && verifyEmailParams[0] === 'success';
  const t = await getTranslations({
    locale,
    namespace: 'VerifyEmail',
  });

  return {
    title: isSuccess ? t('success_meta_title') : t('meta_title'),
    description: isSuccess ? t('success_meta_description') : t('meta_description'),
  };
}

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { locale, 'verify-email': verifyEmailParams } = await props.params;
  setRequestLocale(locale);

  const isSuccess = verifyEmailParams && verifyEmailParams[0] === 'success';

  if (isSuccess) {
    return <VerifyEmailSuccess />;
  }

  return <VerifyEmailForm />;
}
