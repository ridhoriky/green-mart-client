import type { APIResponse } from '@/features/auth/types/auth';
import type { ProductListResponse, ProductQueryParams } from '@/features/products/types/product';
import type { StoreDetail, StoreListResponse } from '@/features/stores/types/store';
import { apiClient } from '@/libs/apiClient';

export type StoreQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const storeApi = {
  /**
   * List all stores with pagination and search.
   * @param params - Optional pagination and search query parameters.
   * @returns Paginated list of stores.
   */
  getStores: async (params?: StoreQueryParams): Promise<StoreListResponse> => {
    const res = await apiClient.get<APIResponse<StoreListResponse>>('/stores', { params });
    return res.data.data;
  },

  /**
   * Get store details by its slug.
   * @param slug - Store slug.
   * @returns Detailed information of the store.
   */
  getStoreBySlug: async (slug: string): Promise<StoreDetail> => {
    const res = await apiClient.get<APIResponse<StoreDetail>>(`/stores/${slug}`);
    return res.data.data;
  },

  /**
   * Get products of a store by store slug.
   * @param slug - Store slug.
   * @param params - Optional pagination/product query parameters.
   * @returns Paginated list of products for the store.
   */
  getStoreProducts: async (
    slug: string,
    params?: ProductQueryParams,
  ): Promise<ProductListResponse> => {
    const res = await apiClient.get<APIResponse<ProductListResponse>>(`/stores/${slug}/products`, {
      params,
    });
    return res.data.data;
  },
};
