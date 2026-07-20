'use client';

import { Heart, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useWishlistQuery } from '@/features/wishlist/hooks/useWishlist';
import { Link } from '@/libs/I18nNavigation';

/**
 * Renders the user's wishlist catalog page.
 *
 * @returns The WishlistPage component.
 */
export function WishlistPage() {
  const t = useTranslations('WishlistPage');
  const { data: wishlistData, isLoading, isError, refetch } = useWishlistQuery();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded bg-surface-container-high" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              className="flex h-[320px] animate-pulse flex-col overflow-hidden rounded-xl border border-outline-variant bg-white"
            >
              <div className="aspect-square bg-surface-container-high" />
              <div className="flex flex-1 flex-col space-y-2 p-3">
                <div className="h-3 w-1/3 rounded bg-surface-container-high" />
                <div className="h-4 w-5/6 rounded bg-surface-container-high" />
                <div className="h-4 w-1/2 rounded bg-surface-container-high" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-16 text-center">
        <Heart className="mx-auto mb-4 h-12 w-12 text-error" />
        <h2 className="font-headline-md mb-2 text-body-lg font-bold text-on-surface">
          {t('error_loading')}
        </h2>
        <Button variant="default" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const items = wishlistData?.items ?? [];
  const hasItems = items.length > 0;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Back to Catalog Link */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Browse Products</span>
      </Link>

      <div className="mb-6 flex items-center justify-between border-b border-outline-variant pb-4">
        <h1 className="font-headline-lg text-[24px] font-bold text-on-surface">{t('title')}</h1>
        {hasItems && (
          <span className="text-[13px] font-medium text-outline">
            {wishlistData?.total_items ?? items.length} items
          </span>
        )}
      </div>

      {hasItems ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-low text-outline-variant">
            <Heart className="h-10 w-10 text-outline" />
          </div>
          <h2 className="mb-2 text-body-lg font-bold text-on-surface">{t('empty_title')}</h2>
          <p className="mb-8 max-w-sm text-[13px] leading-relaxed text-on-surface-variant">
            {t('empty_subtitle')}
          </p>
          <Link href="/products">
            <Button variant="default" className="rounded-full px-6 font-semibold shadow-sm">
              {t('browse_products')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
