import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth';
import { CartCatalog } from '@/features/cart';

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates dynamic metadata for the Cart Page.
 *
 * @param props - The page props.
 * @returns The page metadata.
 */
export async function generateMetadata(props: CartPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'CartPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Renders the cart page protected by the AuthGuard.
 *
 * @param props - The page props.
 * @returns The cart page element.
 */
export default async function CartPage(props: CartPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <CartCatalog />
    </AuthGuard>
  );
}
