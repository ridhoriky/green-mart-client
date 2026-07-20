import type { PaginationMeta } from '@/features/products/types/product';

/**
 * Represents the detailed information of a store/seller.
 */
export type StoreDetail = {
  id: string;
  slug: string;
  store_name: string;
  description: string;
  logo_url?: string;
  banner_url?: string;
  is_verified: boolean;
  rating_avg: number;
  total_sales: number;
  total_products: number;
  created_at: string;
  updated_at?: string;
  user_id?: string;
};

/**
 * Represents the paginated response for a list of stores.
 */
export type StoreListResponse = {
  data: StoreDetail[];
  meta: PaginationMeta;
};
