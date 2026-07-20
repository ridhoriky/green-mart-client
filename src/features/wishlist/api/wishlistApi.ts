import type { APIResponse } from '@/features/auth/types/auth';
import type { WishlistResponse } from '@/features/wishlist/types/wishlist';
import { apiClient } from '@/libs/apiClient';

export const wishlistApi = {
  /**
   * Retrieves the current user's wishlist.
   * @returns Mapped wishlist response containing items and total count.
   */
  getWishlist: async (): Promise<WishlistResponse> => {
    const res = await apiClient.get<APIResponse<WishlistResponse>>('/wishlist');
    return res.data.data;
  },

  /**
   * Adds a product to the user's wishlist.
   * @param productId - Product UUID.
   * @returns API response wrapper.
   */
  addToWishlist: async (productId: string): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/wishlist', {
      product_id: productId,
    });
    return res.data;
  },

  /**
   * Removes a product from the user's wishlist.
   * @param productId - Product UUID.
   * @returns API response wrapper.
   */
  removeFromWishlist: async (productId: string): Promise<APIResponse> => {
    const res = await apiClient.delete<APIResponse>(`/wishlist/${productId}`);
    return res.data;
  },

  /**
   * Toggles a product in the user's wishlist.
   * @param productId - Product UUID.
   * @returns API response wrapper.
   */
  toggleWishlist: async (productId: string): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/wishlist/toggle', {
      product_id: productId,
    });
    return res.data;
  },
};
