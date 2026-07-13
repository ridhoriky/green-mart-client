import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { FlashSaleCatalog } from '@/features/flash-sale';

type FlashSalePageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate dynamic metadata for the Flash Sale Page.
 *
 * @param props - The page props.
 * @returns The page metadata.
 */
export async function generateMetadata(props: FlashSalePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'FlashSalePage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Render fallback skeleton while Flash Sale page is loading.
 *
 * @returns The fallback skeleton element.
 */
function CatalogFallback() {
  return (
    <div className="mx-auto max-w-container-max animate-pulse px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Banner Skeleton */}
      <div className="mb-8 h-48 w-full rounded-3xl bg-surface-container-high" />

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar Skeleton */}
        <aside className="hidden w-64 shrink-0 md:block">
          <Card className="h-[400px] rounded-2xl border border-outline-variant bg-white p-6" />
        </aside>
        {/* Grid Skeleton */}
        <main className="flex-1 space-y-6">
          <div className="h-11 w-full max-w-md rounded-full bg-surface-container-high" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="flex h-[360px] flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
              >
                <div className="aspect-square bg-surface-container-high" />
                <div className="flex flex-1 flex-col space-y-3 p-4">
                  <div className="h-3 w-1/3 rounded bg-surface-container-high" />
                  <div className="h-4 w-5/6 rounded bg-surface-container-high" />
                  <div className="h-4 w-1/2 rounded bg-surface-container-high" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Render flash sale page.
 *
 * @param props - The page props.
 * @returns The flash sale page element.
 */
export default async function FlashSalePage(props: FlashSalePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <React.Suspense fallback={<CatalogFallback />}>
      <FlashSaleCatalog />
    </React.Suspense>
  );
}
