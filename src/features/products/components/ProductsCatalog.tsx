'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCategoriesQuery } from '@/features/categories/hooks/useCategories';
import { useActiveFilters } from '@/features/products/hooks/useActiveFilters';
import { useCatalogParams } from '@/features/products/hooks/useCatalogParams';
import { useProductsQuery } from '@/features/products/hooks/useProducts';
import type { ProductQueryParams, ProductListResponse } from '@/features/products/types/product';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { CatalogFilters } from './CatalogFilters';
import { CatalogTopBar } from './CatalogTopBar';
import { PaginationSection } from './PaginationSection';
import { ProductCard } from './ProductCard';

type CatalogGridProps = {
  isLoading: boolean;
  productsData?: ProductListResponse;
  handleClearAll: () => void;
  t: ReturnType<typeof useTranslations>;
};

function CatalogGrid(props: CatalogGridProps) {
  const { isLoading, productsData, handleClearAll, t } = props;

  if (isLoading) {
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
              <div className="flex-1" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-1/4 animate-pulse rounded bg-surface-container-high" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-surface-container-high" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (productsData && productsData.data.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
      <Button onClick={handleClearAll} variant="default" className="rounded-full px-6">
        Clear all filters
      </Button>
    </div>
  );
}

export function ProductsCatalog() {
  const t = useTranslations('ProductsPage');

  const { q, category, minPrice, maxPrice, rating, inStock, sort, page, updateParams } =
    useCatalogParams();

  const limit = 12;

  // Local state for filter inputs
  const [searchInput, setSearchInput] = React.useState(q);
  const [localMinPrice, setLocalMinPrice] = React.useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Sync inputs with URL when URL changes (e.g. back button)
  React.useEffect(() => {
    setSearchInput(q);
  }, [q]);

  React.useEffect(() => {
    setLocalMinPrice(minPrice);
  }, [minPrice]);

  React.useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  // Query parameters for fetching
  const queryParams: ProductQueryParams = {
    q: q || undefined,
    category: category || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    rating: rating ? Number(rating) : undefined,
    in_stock: inStock || undefined,
    sort,
    page,
    limit,
  };

  const { data: productsData, isLoading, isError } = useProductsQuery(queryParams);
  const { data: categoriesData } = useCategoriesQuery();

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput });
  };

  const handleApplyPrice = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateParams({
      min_price: localMinPrice || undefined,
      max_price: localMaxPrice || undefined,
    });
  };

  const handleClearAll = () => {
    setSearchInput('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    updateParams({
      q: undefined,
      category: undefined,
      min_price: undefined,
      max_price: undefined,
      rating: undefined,
      in_stock: undefined,
      page: undefined,
      sort: undefined,
    });
  };

  const totalProducts = productsData?.meta.total ?? 0;
  const totalPages = productsData?.meta.total_pages ?? 1;

  const activeFilters = useActiveFilters({
    q,
    category,
    categoriesData,
    minPrice,
    maxPrice,
    rating,
    inStock,
    translationNamespace: 'ProductsPage',
  });

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <Card className="sticky top-24 rounded-2xl border border-outline-variant bg-white p-6">
            <h2 className="font-title-lg mb-5 flex items-center gap-2 text-body-lg font-bold text-on-surface">
              <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
              {t('filter_title')}
            </h2>
            <CatalogFilters
              categoriesData={categoriesData}
              category={category}
              updateParams={updateParams}
              localMinPrice={localMinPrice}
              setLocalMinPrice={setLocalMinPrice}
              localMaxPrice={localMaxPrice}
              setLocalMaxPrice={setLocalMaxPrice}
              handleApplyPrice={handleApplyPrice}
              rating={rating}
              inStock={inStock}
              activeFiltersLength={activeFilters.length}
              handleClearAll={handleClearAll}
              translationNamespace="ProductsPage"
            />
          </Card>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <CatalogTopBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearchSubmit={handleSearchSubmit}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            sort={sort}
            updateParams={updateParams}
            translationNamespace="ProductsPage"
          />

          <ActiveFiltersBar
            activeFilters={activeFilters}
            updateParams={updateParams}
            setSearchInput={setSearchInput}
            setLocalMinPrice={setLocalMinPrice}
            setLocalMaxPrice={setLocalMaxPrice}
          />

          {/* Item Count */}
          <div className="mb-4 text-[13px] font-medium text-on-surface-variant">
            {isLoading ? (
              <div className="h-4 w-32 animate-pulse rounded bg-surface-container-high" />
            ) : (
              <span>
                {totalProducts} {t('items_found')}
              </span>
            )}
          </div>

          {/* Error State */}
          {isError && (
            <Card className="mx-auto my-10 max-w-lg rounded-2xl border-error bg-error/5 p-8 text-center text-error">
              <p className="mb-2 font-semibold">Failed to load products.</p>
              <p className="mb-4 text-body-sm">
                There was a server issue retrieving the product listing.
              </p>
              <Button
                onClick={() => {
                  updateParams({ page }); // retry
                }}
              >
                Retry
              </Button>
            </Card>
          )}

          {/* Products Grid */}
          {!isError && (
            <CatalogGrid
              isLoading={isLoading}
              productsData={productsData}
              handleClearAll={handleClearAll}
              t={t}
            />
          )}

          <PaginationSection page={page} totalPages={totalPages} updateParams={updateParams} />
        </main>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      {mobileFiltersOpen && (
        <>
          {/* Backdrop */}
          <button
            className="fixed inset-0 z-50 h-full w-full cursor-default border-none bg-black/40 backdrop-blur-xs md:hidden"
            onClick={() => {
              setMobileFiltersOpen(false);
            }}
            type="button"
            aria-label="Close Filters"
          />
          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 z-50 flex w-80 flex-col overflow-y-auto bg-white p-6 shadow-2xl md:hidden">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-title-lg flex items-center gap-2 text-body-lg font-bold text-on-surface">
                <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                {t('filter_title')}
              </h2>
              <button
                onClick={() => {
                  setMobileFiltersOpen(false);
                }}
                className="rounded-full p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"
                aria-label="Close Filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1">
              <CatalogFilters
                categoriesData={categoriesData}
                category={category}
                updateParams={updateParams}
                localMinPrice={localMinPrice}
                setLocalMinPrice={setLocalMinPrice}
                localMaxPrice={localMaxPrice}
                setLocalMaxPrice={setLocalMaxPrice}
                handleApplyPrice={handleApplyPrice}
                rating={rating}
                inStock={inStock}
                activeFiltersLength={activeFilters.length}
                handleClearAll={handleClearAll}
                translationNamespace="ProductsPage"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
