import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StoreDetailPage } from '@/features/stores';
import { storeApi } from '@/features/stores/api/storeApi';

type StoreDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Generates dynamic metadata for the Store Detail Page.
 *
 * @param props - The page props.
 * @returns Dynamic metadata.
 */
export async function generateMetadata(props: StoreDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const store = await storeApi.getStoreBySlug(slug);
    return {
      title: `${store.store_name} | GreenMart Store`,
      description: store.description
        ? store.description.slice(0, 155)
        : `Buy fresh organic produce direct from ${store.store_name} at GreenMart.`,
    };
  } catch {
    return {
      title: 'Store Details | GreenMart',
      description: 'Buy fresh organic produce direct from local farmers at GreenMart.',
    };
  }
}

/**
 * Renders the Store Detail Page.
 *
 * @param props - The page props.
 * @returns The store detail page element.
 */
export default async function ShopStoreDetailPage(props: StoreDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  return <StoreDetailPage slug={slug} />;
}
