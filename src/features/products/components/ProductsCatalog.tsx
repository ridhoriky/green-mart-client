'use client';

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Star,
  X,
  Sliders,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useProductsQuery, useCategoriesQuery } from '@/features/products/hooks/useProducts';
import type {
  CategoryTreeNode,
  ProductQueryParams,
  ProductListResponse,
} from '@/features/products/types/product';
import { useRouter, usePathname } from '@/libs/I18nNavigation';
import { ProductCard } from './ProductCard';

type CatalogFiltersProps = {
  categoriesData?: CategoryTreeNode[];
  category: string;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  localMinPrice: string;
  setLocalMinPrice: (val: string) => void;
  localMaxPrice: string;
  setLocalMaxPrice: (val: string) => void;
  handleApplyPrice: (e: React.SyntheticEvent) => void;
  rating: string;
  inStock: boolean;
  activeFiltersLength: number;
  handleClearAll: () => void;
  t: ReturnType<typeof useTranslations>;
};

function isCategoryMatch(node: CategoryTreeNode, categoryParam: string) {
  if (!categoryParam) {
    return false;
  }

  if (node.id === categoryParam) {
    return true;
  }

  const normalizedParam = categoryParam.toLowerCase().trim();
  const normalizedName = node.name.toLowerCase().trim();

  if (normalizedName === normalizedParam) {
    return true;
  }

  const slugifiedName = normalizedName
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^[-]+|[-]+$/gu, '');
  if (slugifiedName === normalizedParam) {
    return true;
  }

  if (normalizedName.replaceAll(/\s+/gu, '-') === normalizedParam) {
    return true;
  }

  return false;
}

function findCategoryName(nodes: CategoryTreeNode[], targetId: string): string | null {
  for (const node of nodes) {
    if (isCategoryMatch(node, targetId)) {
      return node.name;
    }
    if (node.children) {
      const res = findCategoryName(node.children, targetId);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

function useActiveFilters(params: {
  q: string;
  category: string;
  categoriesData?: CategoryTreeNode[];
  minPrice: string;
  maxPrice: string;
  rating: string;
  inStock: boolean;
}) {
  const t = useTranslations('ProductsPage');
  const { q, category, categoriesData, minPrice, maxPrice, rating, inStock } = params;
  const activeFilters = [];
  if (q) {
    activeFilters.push({ label: `"${q}"`, key: 'q' });
  }
  if (category && categoriesData) {
    const catName = findCategoryName(categoriesData, category);
    if (catName) {
      activeFilters.push({ label: catName, key: 'category' });
    }
  }
  if (minPrice || maxPrice) {
    const minLabel = minPrice ? `Rp ${Number(minPrice).toLocaleString('id-ID')}` : 'Rp 0';
    const maxLabel = maxPrice ? `Rp ${Number(maxPrice).toLocaleString('id-ID')}` : '∞';
    activeFilters.push({ label: `${minLabel} - ${maxLabel}`, key: 'price' });
  }
  if (rating) {
    activeFilters.push({ label: `${rating}+ ★`, key: 'rating' });
  }
  if (inStock) {
    activeFilters.push({ label: t('in_stock_only'), key: 'in_stock' });
  }
  return activeFilters;
}

function useCatalogParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';
  const minPrice = searchParams.get('min_price') ?? '';
  const maxPrice = searchParams.get('max_price') ?? '';
  const rating = searchParams.get('rating') ?? '';
  const inStock = searchParams.get('in_stock') === 'true';
  const sortParam = searchParams.get('sort');
  const sort: ProductQueryParams['sort'] =
    sortParam === 'newest' ||
    sortParam === 'price_asc' ||
    sortParam === 'price_desc' ||
    sortParam === 'rating' ||
    sortParam === 'popular'
      ? sortParam
      : 'newest';
  const page = Number(searchParams.get('page') ?? '1');

  const updateParams = (
    newParams: Record<string, string | number | boolean | undefined | null>,
  ) => {
    const current = new URLSearchParams([...searchParams.entries()]);

    for (const [key, value] of Object.entries(newParams)) {
      if (value === undefined || value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    }

    if (!('page' in newParams)) {
      current.delete('page');
    }

    router.push(`${pathname}?${current.toString()}`);
  };

  return {
    q,
    category,
    minPrice,
    maxPrice,
    rating,
    inStock,
    sort,
    page,
    updateParams,
  };
}

function CatalogFilters(props: CatalogFiltersProps) {
  const {
    categoriesData,
    category,
    updateParams,
    localMinPrice,
    setLocalMinPrice,
    localMaxPrice,
    setLocalMaxPrice,
    handleApplyPrice,
    rating,
    inStock,
    activeFiltersLength,
    handleClearAll,
    t,
  } = props;

  // Recursive rendering of category tree
  const renderCategories = (
    nodes: CategoryTreeNode[],
    depth = 0,
    isParentSelected = false,
  ): React.ReactNode =>
    nodes.map((node) => {
      const isExactSelected = isCategoryMatch(node, category);
      const isSelected = isParentSelected || isExactSelected;
      return (
        <div key={node.id} style={{ paddingLeft: `${depth * 12}px` }} className="my-1">
          <button
            type="button"
            onClick={() => {
              updateParams({ category: isExactSelected ? undefined : node.name });
            }}
            className={`flex w-full items-center justify-between truncate rounded-md px-2 py-1 text-left font-body-sm text-[13px] transition-colors hover:bg-surface-container-low ${
              isSelected ? 'bg-primary/10 font-bold text-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>{node.name}</span>
            <span className="text-[10px] text-outline">({node.product_count})</span>
          </button>
          {node.children &&
            node.children.length > 0 &&
            renderCategories(node.children, depth + 1, isSelected)}
        </div>
      );
    });

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('categories')}
        </h3>
        <div className="hide-scrollbar max-h-60 overflow-y-auto pr-1">
          {categoriesData && categoriesData.length > 0 ? (
            renderCategories(categoriesData)
          ) : (
            <div className="py-2 text-[12px] text-outline">Loading...</div>
          )}
        </div>
      </div>

      <hr className="border-outline-variant" />

      {/* Price Range Filter */}
      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('price_range')}
        </h3>
        <form onSubmit={handleApplyPrice} className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t('min_price')}
              value={localMinPrice}
              onChange={(e) => {
                setLocalMinPrice(e.target.value);
              }}
              className="h-9 text-[13px]"
              min="0"
            />
            <span className="text-outline-variant">—</span>
            <Input
              type="number"
              placeholder={t('max_price')}
              value={localMaxPrice}
              onChange={(e) => {
                setLocalMaxPrice(e.target.value);
              }}
              className="h-9 text-[13px]"
              min="0"
            />
          </div>
          <Button type="submit" variant="outline" className="h-8 w-full text-[12px]">
            Apply
          </Button>
        </form>
      </div>

      <hr className="border-outline-variant" />

      {/* Rating Filter */}
      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('minimum_rating')}
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((stars) => {
            const isSelected = rating === String(stars);
            return (
              <button
                key={stars}
                type="button"
                onClick={() => {
                  updateParams({ rating: isSelected ? undefined : stars });
                }}
                className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-surface-container-low ${
                  isSelected ? 'bg-primary/10 font-bold text-primary' : 'text-on-surface-variant'
                }`}
              >
                <div className="flex items-center gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < stars ? 'fill-yellow-500 text-yellow-500' : 'text-outline-variant'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-outline">{stars === 5 ? 'Only' : '& Up'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-outline-variant" />

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in_stock"
          checked={inStock}
          onCheckedChange={(checked) => {
            updateParams({ in_stock: checked ? true : undefined });
          }}
        />
        <Label
          htmlFor="in_stock"
          className="cursor-pointer text-[13px] font-medium text-on-surface-variant select-none"
        >
          {t('in_stock_only')}
        </Label>
      </div>

      {activeFiltersLength > 0 && (
        <>
          <hr className="border-outline-variant" />
          <Button
            onClick={handleClearAll}
            variant="ghost"
            className="h-9 w-full text-[13px] text-error hover:bg-error/5 hover:text-error"
          >
            {t('reset_filters')}
          </Button>
        </>
      )}
    </div>
  );
}

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

type CatalogTopBarProps = {
  searchInput: string;
  setSearchInput: (val: string) => void;
  handleSearchSubmit: (e: React.SyntheticEvent) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (val: boolean) => void;
  sort: string;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  t: ReturnType<typeof useTranslations>;
};

function CatalogTopBar(props: CatalogTopBarProps) {
  const {
    searchInput,
    setSearchInput,
    handleSearchSubmit,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    sort,
    updateParams,
    t,
  } = props;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-md flex-1">
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="h-11 rounded-md border border-outline-variant bg-white pr-10 shadow-xs focus-visible:ring-primary"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <div className="flex items-center justify-between gap-4">
        {/* Mobile Filter Toggle */}
        <Button
          onClick={() => {
            setMobileFiltersOpen(!mobileFiltersOpen);
          }}
          variant="outline"
          className="flex h-11 items-center gap-2 rounded-md border border-outline-variant bg-white px-5 shadow-xs md:hidden"
        >
          <Sliders className="h-4 w-4" />
          <span>{t('filter_title')}</span>
        </Button>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <span className="hidden text-[12px] font-medium whitespace-nowrap text-outline sm:inline">
            {t('sort_by')}:
          </span>
          <Select
            value={sort}
            onChange={(e) => {
              updateParams({ sort: e.target.value });
            }}
            variant="primary"
            size="medium"
            className="bg-white text-on-surface focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="newest">{t('sort_newest')}</option>
            <option value="price_asc">{t('sort_price_asc')}</option>
            <option value="price_desc">{t('sort_price_desc')}</option>
            <option value="rating">{t('sort_rating')}</option>
            <option value="popular">{t('sort_popular')}</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

type ActiveFiltersBarProps = {
  activeFilters: { label: string; key: string }[];
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  setSearchInput: (val: string) => void;
  setLocalMinPrice: (val: string) => void;
  setLocalMaxPrice: (val: string) => void;
};

function ActiveFiltersBar(props: ActiveFiltersBarProps) {
  const { activeFilters, updateParams, setSearchInput, setLocalMinPrice, setLocalMaxPrice } = props;

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemove = (key: string) => {
    if (key === 'q') {
      setSearchInput('');
      updateParams({ q: undefined });
    } else if (key === 'category') {
      updateParams({ category: undefined });
    } else if (key === 'price') {
      setLocalMinPrice('');
      setLocalMaxPrice('');
      updateParams({ min_price: undefined, max_price: undefined });
    } else if (key === 'rating') {
      updateParams({ rating: undefined });
    } else if (key === 'in_stock') {
      updateParams({ in_stock: undefined });
    }
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-bold tracking-wider text-outline uppercase">
        Active:
      </span>
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant="outline"
          className="flex items-center gap-1.5 rounded-full border border-outline-variant bg-white py-1 pr-1 pl-3 text-[12px] font-medium text-on-surface"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => {
              handleRemove(filter.key);
            }}
            className="rounded-full p-0.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"
            aria-label="Remove Filter"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

type PaginationSectionProps = {
  page: number;
  totalPages: number;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
};

function PaginationSection(props: PaginationSectionProps) {
  const { page, totalPages, updateParams } = props;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => {
          updateParams({ page: page - 1 });
        }}
        className="h-10 w-10 rounded-full"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <span className="text-[13px] font-semibold text-on-surface">
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => {
          updateParams({ page: page + 1 });
        }}
        className="h-10 w-10 rounded-full"
        aria-label="Next Page"
      >
        <ChevronRight className="h-5 w-5" />
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
              t={t}
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
            t={t}
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
                t={t}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
