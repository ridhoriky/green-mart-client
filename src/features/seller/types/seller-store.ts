/**
 * Represents store details for the seller's own store.
 */
export type MyStore = {
  id: string;
  store_name: string;
  slug: string;
  description: string;
  logo_url?: string;
  banner_url?: string;
  is_verified: boolean;
  rating_avg: number;
  total_sales: number;
  total_products?: number;
  created_at: string;
  updated_at?: string;
  user_id?: string;
};

/**
 * Request payload for updating store profile.
 */
export type UpdateStoreRequest = {
  store_name?: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
};

/**
 * Quick performance statistics of the store.
 */
export type StoreStats = {
  total_revenue: number;
  total_orders: number;
  total_products: number;
  active_products?: number;
  total_reviews?: number;
  average_rating: number;
};
