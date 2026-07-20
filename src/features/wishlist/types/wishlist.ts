import type { Product } from '@/features/products/types/product';

/**
 * Represents a single item in the user's wishlist.
 */
type WishlistItem = {
  id: string;
  product: Product;
  added_at: string;
  createdAt?: string;
};

/**
 * Represents the API response structure for retrieving the user's wishlist.
 */
export type WishlistResponse = {
  items: WishlistItem[];
  total_items: number;
  total?: number;
};
