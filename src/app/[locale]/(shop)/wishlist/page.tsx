import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { WishlistPage } from '@/features/wishlist';

type WishlistPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates dynamic metadata for the Wishlist Page.
 *
 * @param props - The page props.
 * @returns The page metadata.
 */
export async function generateMetadata(props: WishlistPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'WishlistPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Renders the wishlist page protected by the AuthGuard.
 *
 * @param props - The page props.
 * @returns The wishlist page element.
 */
export default async function ShopWishlistPage(props: WishlistPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <WishlistPage />
    </AuthGuard>
  );
}
