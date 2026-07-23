import type { OrderItem } from '@/features/orders/types/order';
import type { PaginationMeta } from '@/features/products/types/product';

/**
 * Represents the status of a seller order.
 */
export type SellerOrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'paid';

/**
 * Represents a seller order summary in the orders list.
 */
export type SellerOrder = {
  id: string;
  order_number: string;
  buyer_name: string;
  status: SellerOrderStatus;
  total_amount: number;
  items_count: number;
  created_at: string;
};

/**
 * Represents detailed seller order information.
 */
export type SellerOrderDetail = SellerOrder & {
  items: OrderItem[];
  buyer_address?: string;
  notes?: string;
  updated_at?: string;
};

/**
 * Request payload for updating order status.
 */
export type UpdateOrderStatusRequest = {
  status: SellerOrderStatus;
};

/**
 * Query parameters for fetching seller orders.
 */
export type SellerOrderQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
};

/**
 * Response structure for paginated seller orders list.
 */
export type SellerOrderListResponse = {
  data: SellerOrder[];
  meta: PaginationMeta;
};
