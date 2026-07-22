import type { APIResponse } from '@/features/auth/types/auth';
import { apiClient } from '@/libs/apiClient';
import type {
  SellerProduct,
  SellerProductListResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types/seller-product';

export const sellerProductApi = {
  /**
   * Gets a paginated list of seller products.
   * @param params - Optional query parameters for filtering and pagination.
   * @returns A paginated response of seller products.
   */
  getMyProducts: async (params?: Record<string, unknown>): Promise<SellerProductListResponse> => {
    const res = await apiClient.get<APIResponse<SellerProductListResponse>>('/seller/products', {
      params,
    });
    return res.data.data;
  },

  /**
   * Gets the detail of a specific seller product.
   * @param id - The product ID.
   * @returns The product detail.
   */
  getMyProductDetail: async (id: string): Promise<SellerProduct> => {
    const res = await apiClient.get<APIResponse<SellerProduct>>(`/seller/products/${id}`);
    return res.data.data;
  },

  /**
   * Creates a new product.
   * @param data - The product creation payload.
   * @returns The created product.
   */
  createProduct: async (data: CreateProductRequest): Promise<SellerProduct> => {
    // Note: The task lists POST /products, but standard would be /seller/products. Using /products as per task.
    // Let's use /seller/products to be consistent with getMyProducts if there's no specific reason.
    // Wait, the task says: `createProduct(data)` → `POST /products`.
    // I will use `/products` as specified, or `/seller/products`.
    // Let's check swagger if possible, but task says POST /products.
    const res = await apiClient.post<APIResponse<SellerProduct>>('/products', data);
    return res.data.data;
  },

  /**
   * Updates an existing product.
   * @param id - The product ID.
   * @param data - The update payload.
   * @returns The updated product.
   */
  updateProduct: async (id: string, data: UpdateProductRequest): Promise<SellerProduct> => {
    const res = await apiClient.put<APIResponse<SellerProduct>>(`/seller/products/${id}`, data);
    return res.data.data;
  },

  /**
   * Deletes a product.
   * @param id - The product ID.
   */
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/seller/products/${id}`);
  },

  /**
   * Adds an image to a product.
   * @param id - The product ID.
   * @param formData - The form data containing the image.
   */
  addProductImage: async (id: string, formData: FormData): Promise<void> => {
    await apiClient.post(`/seller/products/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Deletes a product image.
   * @param id - The product ID.
   * @param imageId - The image ID.
   */
  deleteProductImage: async (id: string, imageId: string): Promise<void> => {
    await apiClient.delete(`/seller/products/${id}/images/${imageId}`);
  },

  /**
   * Sets a product image as primary.
   * @param id - The product ID.
   * @param imageId - The image ID.
   */
  setPrimaryImage: async (id: string, imageId: string): Promise<void> => {
    await apiClient.put(`/seller/products/${id}/images/${imageId}/primary`);
  },
};
