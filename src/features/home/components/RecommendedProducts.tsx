'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useProductsQuery } from '@/features/products/hooks/useProducts';
import { Link } from '@/libs/I18nNavigation';

export function RecommendedProducts() {
  const t = useTranslations('Index.RecommendedProducts');

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProductsQuery({
    sort: 'popular',
    limit: 8,
  });

  if (isError) {
    return null;
  }

  let recommendedListContent: React.ReactNode = null;
  if (isLoading) {
    recommendedListContent = Array.from({ length: 5 }).map((_, i) => (
      <Card
        key={i}
        className="flex h-[320px] max-w-[240px] min-w-[240px] animate-pulse flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
      >
        <div className="aspect-square bg-surface-container-high" />
        <div className="flex flex-1 flex-col space-y-2 p-3">
          <div className="h-3 w-1/3 rounded bg-surface-container-high" />
          <div className="h-4 w-5/6 rounded bg-surface-container-high" />
          <div className="h-4 w-1/2 rounded bg-surface-container-high" />
        </div>
      </Card>
    ));
  } else if (productsData && productsData.data.length > 0) {
    recommendedListContent = productsData.data.map((product) => (
      <div key={product.id} className="max-w-[240px] min-w-[240px]">
        <ProductCard product={product} />
      </div>
    ));
  } else {
    recommendedListContent = (
      <div className="w-full py-8 text-center text-[13px] text-outline">
        No recommended products available.
      </div>
    );
  }

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
      <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
        <h2 className="font-headline-lg text-headline-lg">{t('title')}</h2>
        <Link
          className="font-label-bold text-[14px] whitespace-nowrap text-primary hover:underline"
          href="/products"
        >
          {t('view_all')}
        </Link>
      </div>

      <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-6">{recommendedListContent}</div>
    </section>
  );
}
