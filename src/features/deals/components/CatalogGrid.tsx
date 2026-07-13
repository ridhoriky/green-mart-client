import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { ProductListResponse } from '@/features/products/types/product';
import { getMockDiscount } from '../utils/helpers';

/**
 * Grid layout for showing Deals items. Shows skeletons while loading, and a fallback no-results-found page.
 *
 * @param props - The component props.
 * @returns The product grid component.
 */
export function CatalogGrid(props: {
  isLoading: boolean;
  productsData?: ProductListResponse;
  handleClearAll: () => void;
}) {
  const t = useTranslations('DealsPage');

  if (props.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="flex h-[360px] flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
          >
            <div className="aspect-square animate-pulse bg-surface-container-high" />
            <div className="flex flex-1 flex-col space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-surface-container-high" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-surface-container-high" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-surface-container-high" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (props.productsData && props.productsData.data.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {props.productsData.data.map((product) => {
          const discountPercent = getMockDiscount(product.id);
          const originalPrice = product.price / (1 - discountPercent / 100);
          return (
            <ProductCard
              key={product.id}
              product={product}
              discountPercent={discountPercent}
              originalPrice={originalPrice}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant">
        <Search className="h-6 w-6 text-outline" />
      </div>
      <h3 className="font-title-lg mb-2 text-body-lg font-bold text-on-surface">
        No results found
      </h3>
      <p className="mb-6 text-[13px] text-on-surface-variant">{t('no_products')}</p>
      <Button onClick={props.handleClearAll} variant="default" className="rounded-full px-6">
        Clear all filters
      </Button>
    </div>
  );
}
