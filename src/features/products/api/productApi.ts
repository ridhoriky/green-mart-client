import type { APIResponse } from '@/features/auth/types/auth';
import type {
  ProductDetail,
  ProductListResponse,
  ProductQueryParams,
  ReviewListResponse,
} from '@/features/products/types/product';
import { apiClient } from '@/libs/apiClient';

export const productApi = {
  /**
   * Retrieve list of products with filters.
   * @param params Query filters for product listing.
   * @returns Product list response.
   */
  getProducts: async (params?: ProductQueryParams): Promise<ProductListResponse> => {
    const res = await apiClient.get<APIResponse<ProductListResponse>>('/products', { params });
    return res.data.data;
  },

  /**
   * Get single product detail by ID or Slug.
   * @param idOrSlug UUID or Slug of the product.
   * @returns Product detail response.
   */
  getProductDetail: async (idOrSlug: string): Promise<ProductDetail> => {
    const res = await apiClient.get<APIResponse<ProductDetail>>(`/products/${idOrSlug}`);
    return res.data.data;
  },

  /**
   * Get reviews for a specific product.
   * @param idOrSlug Product UUID or Slug.
   * @param params Pagination parameters.
   * @returns Product reviews response.
   */
  getProductReviews: async (
    idOrSlug: string,
    params?: { page?: number; limit?: number },
  ): Promise<ReviewListResponse> => {
    const res = await apiClient.get<APIResponse<ReviewListResponse>>(
      `/products/${idOrSlug}/reviews`,
      {
        params,
      },
    );
    return res.data.data;
  },

  /**
   * Toggle a product inside user's wishlist.
   * @param productId Product UUID.
   * @returns API response wrapper.
   */
  toggleWishlist: async (productId: string): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/wishlist/toggle', { product_id: productId });
    return res.data;
  },
};
