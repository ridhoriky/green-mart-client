import type { APIResponse } from '@/features/auth/types/auth';
import type { MyStore, StoreStats, UpdateStoreRequest } from '@/features/seller/types/seller-store';
import { apiClient } from '@/libs/apiClient';

export const sellerStoreApi = {
  /**
   * Fetches current seller store details.
   * @returns Detailed info of current seller's store.
   */
  getMyStore: async (): Promise<MyStore> => {
    const res = await apiClient.get<APIResponse<MyStore>>('/seller/stores/me');
    return res.data.data;
  },

  /**
   * Updates current seller store details.
   * @param data - The update store payload.
   * @returns Updated store details.
   */
  updateMyStore: async (data: UpdateStoreRequest): Promise<MyStore> => {
    const res = await apiClient.put<APIResponse<MyStore>>('/seller/stores/me', data);
    return res.data.data;
  },

  /**
   * Fetches quick statistics for the seller store.
   * @returns Store stats.
   */
  getStoreStats: async (): Promise<StoreStats> => {
    const res = await apiClient.get<APIResponse<StoreStats>>('/seller/store/stats');
    return res.data.data;
  },
};
