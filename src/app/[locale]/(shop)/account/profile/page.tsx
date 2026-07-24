import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard, UserProfilePage } from '@/features/auth';

type AccountProfilePageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates dynamic metadata for the User Profile Page.
 * @param props - Page props.
 * @returns Metadata object.
 */
export async function generateMetadata(props: AccountProfilePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'UserProfilePage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Renders the user account profile page protected by the AuthGuard.
 * @param props - Page props.
 * @returns User profile page view.
 */
export default async function AccountProfilePage(props: AccountProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <UserProfilePage />
    </AuthGuard>
  );
}
