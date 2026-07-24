import type { APIResponse } from '@/features/auth/types/auth';
import { apiClient } from '@/libs/apiClient';
import type {
  SellerOrderQueryParams,
  SellerOrderListResponse,
  SellerOrderDetail,
  UpdateOrderStatusRequest,
} from '../types/seller-order';

export const sellerOrderApi = {
  /**
   * Gets a paginated list of seller orders.
   * @param params - Query parameters for filtering and pagination.
   * @returns A paginated list of seller orders.
   */
  getSellerOrders: async (params?: SellerOrderQueryParams): Promise<SellerOrderListResponse> => {
    const res = await apiClient.get<APIResponse<SellerOrderListResponse>>('/seller/orders', {
      params,
    });
    return res.data.data;
  },

  /**
   * Gets details of a specific seller order.
   * @param id - The order ID.
   * @returns Detailed seller order information.
   */
  getSellerOrderDetail: async (id: string): Promise<SellerOrderDetail> => {
    const res = await apiClient.get<APIResponse<SellerOrderDetail>>(`/seller/orders/${id}`);
    return res.data.data;
  },

  /**
   * Updates the status of a seller order.
   * @param id - The order ID.
   * @param data - Payload containing the new status.
   */
  updateOrderStatus: async (id: string, data: UpdateOrderStatusRequest): Promise<void> => {
    await apiClient.patch(`/seller/orders/${id}/status`, data);
  },
};
