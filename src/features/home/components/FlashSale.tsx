'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useProductsQuery } from '@/features/products/hooks/useProducts';
import { Link } from '@/libs/I18nNavigation';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    h: String(hours).padStart(2, '0'),
    m: String(minutes).padStart(2, '0'),
    s: String(seconds).padStart(2, '0'),
  };
};

export function FlashSale() {
  const t = useTranslations('Index.FlashSale');

  // Live countdown timer state (ends in 2h 45m 12s initially for mock consistency, but ticking)
  const [timeLeft, setTimeLeft] = React.useState(2 * 3600 + 45 * 60 + 12);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const { h, m, s } = formatTime(timeLeft);

  // Fetch some products to showcase in the flash sale section
  const {
    data: productsData,
    isLoading,
    isError,
  } = useProductsQuery({
    limit: 6,
    in_stock: true,
  });

  if (isError) {
    return null;
  }

  let flashSaleContent: React.ReactNode = null;
  if (isLoading) {
    flashSaleContent = Array.from({ length: 4 }).map((_, i) => (
      <Card
        key={i}
        className="flex h-[380px] max-w-[240px] min-w-[240px] animate-pulse flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
      >
        <div className="aspect-square bg-surface-container-high" />
        <div className="flex-1 space-y-3 p-4">
          <div className="h-4 w-3/4 rounded bg-surface-container-high" />
          <div className="h-4 w-1/3 rounded bg-surface-container-high" />
          <div className="h-2 w-full rounded bg-surface-container-high" />
        </div>
      </Card>
    ));
  } else if (productsData && productsData.data.length > 0) {
    flashSaleContent = productsData.data.map((product, idx) => {
      // Flash sales show a nice mock original price and discount percentage
      const discountRates = [20, 30, 15, 25, 40, 50];
      const discountPercent = discountRates[idx % discountRates.length] ?? 20;
      const originalPrice = product.price / (1 - discountPercent / 100);

      // Mock stock progress indicators: Sold vs Available
      const totalItems = Math.max(10, product.stock + idx * 5 + 8);
      const soldItems = totalItems - product.stock;
      const soldPercentage = Math.round((soldItems / totalItems) * 100);

      return (
        <div key={product.id} className="relative max-w-[240px] min-w-[240px]">
          <ProductCard
            product={product}
            originalPrice={originalPrice}
            discountPercent={discountPercent}
          >
            {/* Flash Sale progress indicators */}
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">
                <span>Stock: {product.stock}</span>
                <span>Sold: {soldItems}</span>
              </div>
              <Progress
                value={soldPercentage}
                indicatorClassName="bg-error"
                className="h-1.5 bg-surface-container-high"
              />
            </div>
          </ProductCard>
        </div>
      );
    });
  } else {
    flashSaleContent = (
      <div className="w-full py-8 text-center text-[13px] text-outline">
        No flash sale products currently available.
      </div>
    );
  }

  return (
    <section className="mt-stack-lg bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
            <h2 className="flex items-center gap-2 font-headline-lg text-headline-lg">
              <span
                className="material-symbols-outlined text-error"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              {t('title')}
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-label-bold text-[13px] text-on-surface-variant">
                {t('ends_in')}
              </span>
              <div className="flex gap-1 text-[13px]">
                <span className="rounded bg-error px-2 py-1 font-bold text-white shadow-xs">
                  {h}
                </span>
                <span className="self-center align-middle font-bold text-error">:</span>
                <span className="rounded bg-error px-2 py-1 font-bold text-white shadow-xs">
                  {m}
                </span>
                <span className="self-center align-middle font-bold text-error">:</span>
                <span className="rounded bg-error px-2 py-1 font-bold text-white shadow-xs">
                  {s}
                </span>
              </div>
            </div>
          </div>
          <Link
            className="font-label-bold text-[14px] whitespace-nowrap text-primary hover:underline"
            href="/flash-sale"
          >
            {t('view_all')}
          </Link>
        </div>

        <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-6">{flashSaleContent}</div>
      </div>
    </section>
  );
}
