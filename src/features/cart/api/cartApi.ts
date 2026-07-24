import type { APIResponse } from '@/features/auth/types/auth';
import type { CartResponse, CartItem } from '@/features/cart/types/cart';
import type { Product } from '@/features/products/types/product';
import { apiClient } from '@/libs/apiClient';

type BackendCartItem = Omit<CartItem, 'subtotal' | 'product'> & {
  subtotal: string | number;
  product: Omit<Product, 'price'> & {
    price: string | number;
  };
};

type BackendCartResponse = Omit<CartResponse, 'items' | 'total_amount'> & {
  items: BackendCartItem[];
  total_amount: string | number;
};

export const cartApi = {
  /**
   * Gets the current user's shopping cart.
   * @returns The cart items, total amount, and total item count.
   */
  getCart: async (): Promise<CartResponse> => {
    const res = await apiClient.get<APIResponse<BackendCartResponse>>('/cart');
    const { data } = res.data;
    return {
      ...data,
      total_amount: Number(data.total_amount),
      items: data.items.map((item) => ({
        ...item,
        subtotal: Number(item.subtotal),
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
      })),
    };
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
