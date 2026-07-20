'use client';

import { ArrowLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PaginationSection } from '@/features/products/components/PaginationSection';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useCatalogParams } from '@/features/products/hooks/useCatalogParams';
import type { Product } from '@/features/products/types/product';
import { StoreHeader } from '@/features/stores/components/StoreHeader';
import { useStoreQuery, useStoreProductsQuery } from '@/features/stores/hooks/useStore';
import { Link } from '@/libs/I18nNavigation';

type StoreDetailPageProps = {
  slug: string;
};

type StoreCatalogContentProps = {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  totalProducts: number;
  totalPages: number;
  page: number;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  t: ReturnType<typeof useTranslations>;
};

/**
 * Renders the products grid, loader, error message, or empty state.
 *
 * @param props - Component props.
 * @returns The product catalog content.
 */
function StoreCatalogContent(props: StoreCatalogContentProps) {
  if (props.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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

  if (props.isError) {
    return (
      <div className="py-12 text-center text-error">Failed to load products. Please try again.</div>
    );
  }

  if (props.products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[14px] font-medium text-on-surface-variant">{props.t('no_products')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {props.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationSection
        page={props.page}
        totalPages={props.totalPages}
        updateParams={props.updateParams}
      />
    </>
  );
}

/**
 * Renders the public store page detailing store profile information and listing its catalog of products with sorting, filtering, and paging.
 *
 * @param props - Component props containing the store slug.
 * @returns The StoreDetailPage component.
 */
export function StoreDetailPage(props: StoreDetailPageProps) {
  const t = useTranslations('StorePage');
  const { q, sort, page, updateParams } = useCatalogParams();

  const [searchInput, setSearchInput] = React.useState(q);

  React.useEffect(() => {
    setSearchInput(q);
  }, [q]);

  const {
    data: store,
    isLoading: isStoreLoading,
    isError: isStoreError,
  } = useStoreQuery(props.slug);

  const queryParams = {
    q: q || undefined,
    sort: sort || undefined,
    page: page || 1,
    limit: 12,
  };

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useStoreProductsQuery(props.slug, queryParams);

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput });
  };

  if (isStoreLoading) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <div className="h-60 w-full animate-pulse rounded-2xl bg-surface-container-high" />
        <div className="mt-8 flex flex-col gap-6">
          <div className="h-10 w-full animate-pulse rounded bg-surface-container-high" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
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
        </div>
      </div>
    );
  }

  if (isStoreError || !store) {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-16 text-center">
        <h2 className="font-headline-md mb-2 text-body-lg font-bold text-on-surface">
          {t('error_loading')}
        </h2>
        <Link href="/products">
          <Button variant="default" className="mt-4 rounded-full">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const totalProducts = productsData?.meta.total ?? 0;
  const totalPages = productsData?.meta.total_pages ?? 1;
  const products = productsData?.data ?? [];

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Browse Products</span>
      </Link>

      <StoreHeader store={store} />

      <div className="mt-8">
        <div className="mb-6 flex items-center border-b border-outline-variant pb-3">
          <button
            type="button"
            className="border-b-2 border-primary pb-3 text-[15px] font-bold text-primary transition-all duration-200"
          >
            {t('products_tab')}
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
            <input
              type="text"
              aria-label={t('search_placeholder')}
              placeholder={t('search_placeholder')}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              className="h-10 w-full rounded-full border border-outline-variant bg-white pr-4 pl-10 text-[13px] font-medium text-on-surface outline-hidden transition-colors placeholder:text-outline hover:border-outline focus:border-primary"
            />
            <Search className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-outline-variant" />
          </form>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => {
                updateParams({ sort: e.target.value });
              }}
              className="h-10 cursor-pointer rounded-full border border-outline-variant bg-white px-4 text-[13px] font-semibold text-on-surface outline-hidden transition-colors hover:border-outline focus:border-primary"
            >
              <option value="newest">Newest Arrival</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="popular">Popularity</option>
            </select>
          </div>
        </div>

        {!isProductsLoading && !isProductsError && (
          <div className="mb-4 text-[13px] font-medium text-on-surface-variant">
            {t('total_products', { count: totalProducts })}
          </div>
        )}

        <StoreCatalogContent
          isLoading={isProductsLoading}
          isError={isProductsError}
          products={products}
          totalProducts={totalProducts}
          totalPages={totalPages}
          page={page}
          updateParams={updateParams}
          t={t}
        />
      </div>
    </div>
  );
}
