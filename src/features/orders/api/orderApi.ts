import type { APIResponse } from '@/features/auth/types/auth';
import type {
  CheckoutRequest,
  Order,
  OrderListResponse,
  OrderQueryParams,
} from '@/features/orders/types/order';
import { apiClient } from '@/libs/apiClient';

/**
 * Backend order item response mapping that might contain numeric values represented as string or number.
 */
type BackendOrderItem = Omit<Order['items'][number], 'price' | 'subtotal'> & {
  price: string | number;
  subtotal: string | number;
};

/**
 * Backend order response mapping.
 */
type BackendOrder = Omit<Order, 'total_amount' | 'items' | 'shipping_cost'> & {
  total_amount: string | number;
  shipping_cost?: string | number;
  items: BackendOrderItem[];
};

/**
 * Backend order list response mapping.
 */
type BackendOrderListResponse = {
  data: BackendOrder[];
  meta: OrderListResponse['meta'];
};

/**
 * Maps a backend order to a frontend order.
 * @param order - Backend order representation.
 * @returns Fully mapped order.
 */
function mapOrder(order: BackendOrder): Order {
  return {
    ...order,
    total_amount: Number(order.total_amount),
    shipping_cost: order.shipping_cost === undefined ? undefined : Number(order.shipping_cost),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
      subtotal: Number(item.subtotal),
    })),
  };
}

export const orderApi = {
  /**
   * Submits a checkout request with selected cart items and notes.
   * @param data - Checkout parameters.
   * @returns Array of created orders.
   */
  checkout: async (data: CheckoutRequest): Promise<Order[]> => {
    const res = await apiClient.post<APIResponse<BackendOrder[]>>('/orders', data);
    return res.data.data.map(mapOrder);
  },

  /**
   * Retrieves the current user's order list.
   * @param params - Query parameters.
   * @returns Paginated list of orders.
   */
  getOrders: async (params?: OrderQueryParams): Promise<OrderListResponse> => {
    const res = await apiClient.get<APIResponse<BackendOrderListResponse>>('/orders', { params });
    const { data, meta } = res.data.data;
    return {
      data: data.map(mapOrder),
      meta,
    };
  },

  /**
   * Retrieves the details of a single order.
   * @param orderId - Order UUID.
   * @returns Detailed order representation.
   */
  getOrderDetail: async (orderId: string): Promise<Order> => {
    const res = await apiClient.get<APIResponse<BackendOrder>>(`/orders/${orderId}`);
    return mapOrder(res.data.data);
  },

  /**
   * Cancels a pending order.
   * @param orderId - Order UUID.
   * @returns API response wrapper.
   */
  cancelOrder: async (orderId: string): Promise<APIResponse<string>> => {
    const res = await apiClient.patch<APIResponse<string>>(`/orders/${orderId}/cancel`);
    return res.data;
  },

  /**
   * Confirms that a shipped order has been received.
   * @param orderId - Order UUID.
   * @returns API response wrapper.
   */
  confirmOrder: async (orderId: string): Promise<APIResponse<string>> => {
    const res = await apiClient.patch<APIResponse<string>>(`/orders/${orderId}/confirm`);
    return res.data;
  },
};
