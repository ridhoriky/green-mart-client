import type { Product } from '@/features/products/types/product';

/**
 * Represents a store associated with a cart item.
 */
export type CartStore = {
  id: string;
  name: string;
  slug?: string;
  logo_url?: string;
  is_verified?: boolean;
};

/**
 * Represents a single item in the user's shopping cart.
 */
export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  store: CartStore;
  subtotal: number;
};

/**
 * Represents the API response structure for retrieving the user's shopping cart.
 */
export type CartResponse = {
  items: CartItem[];
  total_amount: number;
  total_items: number;
};

/**
 * Represents the request payload for adding an item to the shopping cart.
 */
export type AddToCartRequest = {
  product_id: string;
  quantity: number;
};

/**
 * Represents the request payload for updating a cart item's quantity.
 */
export type UpdateCartRequest = {
  quantity: number;
};
