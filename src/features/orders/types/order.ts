import type { PaginationMeta } from '@/features/products/types/product';

/**
 * Represents an item in an order.
 */
export type OrderItem = {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  subtotal: number;
};

/**
 * Represents the store associated with an order.
 */
export type OrderStore = {
  id: string;
  name: string;
};

/**
 * Represents a customer order.
 */
export type Order = {
  id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'paid';
  total_amount: number;
  items: OrderItem[];
  store: OrderStore;
  created_at: string;
  updated_at: string;
  notes?: string;
  payment_method?: string;
  payment_url?: string;
  shipping_address?: number[];
  shipping_cost?: number;
};

/**
 * Represents the paginated list response of orders.
 */
export type OrderListResponse = {
  data: Order[];
  meta: PaginationMeta;
};

/**
 * Represents the payload for a checkout request.
 */
export type CheckoutRequest = {
  cart_ids: string[];
  payment_method: 'bank_transfer' | 'e_wallet' | 'credit_card';
  shipping_address: number[];
  notes?: string;
};

/**
 * Represents query parameters for fetching orders.
 */
export type OrderQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
};
