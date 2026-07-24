import { useQuery } from '@tanstack/react-query';
import type { ProductQueryParams } from '@/features/products/types/product';
import { storeApi } from '@/features/stores/api/storeApi';

/**
 * Hook to fetch store detail by store slug.
 *
 * @param slug - Store slug.
 * @returns Query result containing store details.
 */
export const useStoreQuery = (slug: string) =>
  useQuery({
    queryKey: ['store', slug],
    queryFn: async () => await storeApi.getStoreBySlug(slug),
    enabled: Boolean(slug),
  });

/**
 * Hook to fetch products belonging to a specific store.
 *
 * @param slug - Store slug.
 * @param params - Optional query filters like pagination.
 * @returns Query result containing the store's products.
 */
export const useStoreProductsQuery = (slug: string, params?: ProductQueryParams) =>
  useQuery({
    queryKey: ['store-products', slug, params],
    queryFn: async () => await storeApi.getStoreProducts(slug, params),
    enabled: Boolean(slug),
  });
