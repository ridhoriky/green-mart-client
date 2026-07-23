import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { ProductListResponse } from '@/features/products/types/product';
import { getMockDiscount } from '../utils/helpers';

/**
 * Grid layout for showing Flash Sale items. Shows skeletons while loading, and a fallback no-results-found page. Shows progress indicators for remaining stock.
 *
 * @param props - The component props.
 * @returns The product grid component.
 */
export function CatalogGrid(props: {
  isLoading: boolean;
  productsData?: ProductListResponse;
  handleClearAll: () => void;
}) {
  const t = useTranslations('FlashSalePage');

  if (props.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="flex h-90 flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
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
        {props.productsData.data.map((product, idx) => {
          const discountPercent = getMockDiscount(product.id);
          const originalPrice = product.price / (1 - discountPercent / 100);

          const totalItems = Math.max(10, product.stock + idx * 5 + 8);
          const soldItems = totalItems - product.stock;
          const soldPercentage = Math.round((soldItems / totalItems) * 100);

          return (
            <ProductCard
              key={product.id}
              product={product}
              discountPercent={discountPercent}
              originalPrice={originalPrice}
            >
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">
                  <span>{t('stock_left', { stock: product.stock })}</span>
                  <span>{t('sold', { sold: soldItems })}</span>
                </div>
                <Progress
                  value={soldPercentage}
                  indicatorClassName="bg-error"
                  className="h-1.5 bg-surface-container-high"
                />
              </div>
            </ProductCard>
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
