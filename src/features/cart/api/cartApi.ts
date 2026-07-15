import type { APIResponse } from '@/features/auth/types/auth';
import type { CartResponse } from '@/features/cart/types/cart';
import { apiClient } from '@/libs/apiClient';

export const cartApi = {
  /**
   * Gets the current user's shopping cart.
   * @returns The cart items, total amount, and total item count.
   */
  getCart: async (): Promise<CartResponse> => {
    const res = await apiClient.get<APIResponse<CartResponse>>('/cart');
    return res.data.data;
  },

  /**
   * Adds a product to the user's shopping cart.
   * @param productId - Product UUID.
   * @param quantity - The quantity of the product to add.
   * @returns API response wrapper.
   */
  addToCart: async (productId: string, quantity: number): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/cart', {
      product_id: productId,
      quantity,
    });
    return res.data;
  },

  /**
   * Updates the quantity of a cart item.
   * @param cartItemId - Cart Item UUID.
   * @param quantity - The new quantity.
   * @returns API response wrapper.
   */
  updateCartItem: async (cartItemId: string, quantity: number): Promise<APIResponse<string>> => {
    const res = await apiClient.put<APIResponse<string>>(`/cart/${cartItemId}`, {
      quantity,
    });
    return res.data;
  },

  /**
   * Removes a single item from the shopping cart.
   * @param cartItemId - Cart Item UUID.
   * @returns API response wrapper.
   */
  removeCartItem: async (cartItemId: string): Promise<APIResponse<string>> => {
    const res = await apiClient.delete<APIResponse<string>>(`/cart/${cartItemId}`);
    return res.data;
  },

  /**
   * Removes all items from the shopping cart.
   * @returns API response wrapper.
   */
  clearCart: async (): Promise<APIResponse<string>> => {
    const res = await apiClient.delete<APIResponse<string>>('/cart');
    return res.data;
  },
};
