import { useSearchParams } from 'next/navigation';
import type { ProductQueryParams } from '@/features/products/types/product';
import { useRouter, usePathname } from '@/libs/I18nNavigation';

/**
 * Handle routing and URLSearchParams parsing for Catalog pages.
 *
 * @param defaultSort - The default sort value if not provided in search query.
 * @returns Query states and parameter update function.
 */
export function useCatalogParams(defaultSort: ProductQueryParams['sort'] = 'newest') {
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
      : defaultSort;
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
