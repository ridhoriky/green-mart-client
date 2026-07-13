'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCategoriesQuery } from '@/features/categories/hooks/useCategories';
import { useProductsQuery } from '@/features/products/hooks/useProducts';
import type { ProductQueryParams } from '@/features/products/types/product';
import { useActiveFilters } from '../hooks/useActiveFilters';
import { useCatalogParams } from '../hooks/useCatalogParams';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { CatalogFilters } from './CatalogFilters';
import { CatalogGrid } from './CatalogGrid';
import { CatalogTopBar } from './CatalogTopBar';
import { FlashSaleBanner } from './FlashSaleBanner';
import { PaginationSection } from './PaginationSection';

/**
 * Renders the main catalog layout for Flash Sales.
 *
 * @returns The Flash Sale catalog component.
 */
export function FlashSaleCatalog() {
  const t = useTranslations('FlashSalePage');

  const { q, category, minPrice, maxPrice, rating, inStock, sort, page, updateParams } =
    useCatalogParams();

  const limit = 12;

  const [searchInput, setSearchInput] = React.useState(q);
  const [localMinPrice, setLocalMinPrice] = React.useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  React.useEffect(() => {
    setSearchInput(q);
  }, [q]);

  React.useEffect(() => {
    setLocalMinPrice(minPrice);
  }, [minPrice]);

  React.useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  const queryParams: ProductQueryParams = {
    q: q || undefined,
    category: category || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    rating: rating ? Number(rating) : undefined,
    in_stock: inStock ? true : undefined,
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
  });

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <FlashSaleBanner />

      <div className="flex flex-col gap-6 md:flex-row">
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
            />
          </Card>
        </aside>

        <main className="flex-1">
          <CatalogTopBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearchSubmit={handleSearchSubmit}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            sort={sort}
            updateParams={updateParams}
          />

          <ActiveFiltersBar
            activeFilters={activeFilters}
            updateParams={updateParams}
            setSearchInput={setSearchInput}
            setLocalMinPrice={setLocalMinPrice}
            setLocalMaxPrice={setLocalMaxPrice}
          />

          <div className="mb-4 text-[13px] font-medium text-on-surface-variant">
            {isLoading ? (
              <div className="h-4 w-32 animate-pulse rounded bg-surface-container-high" />
            ) : (
              <span>{t('items_found', { count: totalProducts })}</span>
            )}
          </div>

          {isError && (
            <Card className="mx-auto my-10 max-w-lg rounded-2xl border-error bg-error/5 p-8 text-center text-error">
              <p className="mb-2 font-semibold">Failed to load products.</p>
              <p className="mb-4 text-body-sm">
                There was a server issue retrieving the product listing.
              </p>
              <Button
                onClick={() => {
                  updateParams({ page });
                }}
              >
                Retry
              </Button>
            </Card>
          )}

          {!isError && (
            <CatalogGrid
              isLoading={isLoading}
              productsData={productsData}
              handleClearAll={handleClearAll}
            />
          )}

          <PaginationSection page={page} totalPages={totalPages} updateParams={updateParams} />
        </main>
      </div>

      {mobileFiltersOpen && (
        <>
          <button
            className="fixed inset-0 z-50 h-full w-full cursor-default border-none bg-black/40 backdrop-blur-xs md:hidden"
            onClick={() => {
              setMobileFiltersOpen(false);
            }}
            type="button"
            aria-label="Close Filters"
          />
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
                className="rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low"
                type="button"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
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
            />
          </div>
        </>
      )}
    </div>
  );
}
