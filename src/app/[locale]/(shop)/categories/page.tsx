import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import * as React from 'react';
import { CategoriesCatalog } from '@/features/categories';

type CategoriesPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate dynamic metadata for the Categories Page.
 *
 * @param props - The page props.
 * @returns The page metadata.
 */
export async function generateMetadata(props: CategoriesPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'CategoriesPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/**
 * Render fallback skeleton while Categories page is loading client side.
 *
 * @returns The fallback skeleton element.
 */
function CategoriesFallback() {
  return (
    <div className="mx-auto max-w-container-max animate-pulse px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-4 w-40 rounded bg-surface-container-high" />
        <div className="mb-2 h-12 w-72 rounded bg-surface-container-high" />
        <div className="h-5 w-96 rounded bg-surface-container-high" />
      </div>
      {/* Search skeleton */}
      <div className="mb-8 h-11 max-w-md rounded-full bg-surface-container-high" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Sidebar skeleton */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="space-y-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-stack-md">
            <div className="mb-4 h-3 w-24 rounded bg-surface-container-high" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-surface-container-high" />
            ))}
          </div>
        </aside>
        {/* Content skeleton */}
        <div className="col-span-12 space-y-10 md:col-span-9 lg:col-span-10">
          {Array.from({ length: 2 }).map((_section, si) => (
            <div key={si}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-8 w-48 rounded bg-surface-container-high" />
                <div className="h-px grow bg-outline-variant/30" />
                <div className="h-4 w-24 rounded bg-surface-container-high" />
              </div>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_card, ci) => (
                  <div key={ci}>
                    <div className="aspect-square rounded-xl bg-surface-container-high" />
                    <div className="mt-4 h-5 w-32 rounded bg-surface-container-high" />
                    <div className="mt-2 h-4 w-48 rounded bg-surface-container-high" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Render categories browse page.
 *
 * @param props - The page props.
 * @returns The categories browse page element.
 */
export default async function CategoriesPage(props: CategoriesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <React.Suspense fallback={<CategoriesFallback />}>
      <CategoriesCatalog />
    </React.Suspense>
  );
}
