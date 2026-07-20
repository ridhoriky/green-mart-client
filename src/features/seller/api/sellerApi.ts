import type { APIResponse } from '@/features/auth/types/auth';
import type {
  CreateStoreRequest,
  StoreResponse,
  SellerDashboard,
} from '@/features/seller/types/seller';
import { apiClient } from '@/libs/apiClient';

export const sellerApi = {
  /**
   * Registers a new seller store.
   * @param data - The store registration payload.
   * @returns The registered store data.
   */
  registerStore: async (data: CreateStoreRequest): Promise<StoreResponse> => {
    const res = await apiClient.post<APIResponse<StoreResponse>>('/seller/stores', data);
    return res.data.data;
  },

  /**
   * Gets the seller dashboard data.
   * @param period - Optional period filter (today, this_week, this_month).
   * @returns Dashboard data including summary, orders, and products.
   */
  getDashboard: async (period = 'this_week'): Promise<SellerDashboard> => {
    const res = await apiClient.get<APIResponse<SellerDashboard>>('/seller/reports/dashboard', {
      params: { period },
    });
    return res.data.data;
  },
};
