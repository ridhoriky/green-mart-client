import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/features/products/api/productApi';
import type { ProductQueryParams } from '@/features/products/types/product';
import { wishlistApi } from '@/features/wishlist/api/wishlistApi';

/**
 * Hook to fetch lists of products with query parameters.
 *
 * @param params Query parameters like sorting, filter, search, page and limit
 * @returns Query result containing the list of products
 */
export const useProductsQuery = (params?: ProductQueryParams) =>
  useQuery({
    queryKey: ['products', params],
    queryFn: async () => await productApi.getProducts(params),
  });

/**
 * Hook to fetch product detail by its UUID or Slug.
 *
 * @param idOrSlug UUID or Slug of the product
 * @returns Query result containing the product detail
 */
export const useProductDetailQuery = (idOrSlug: string) =>
  useQuery({
    queryKey: ['product', idOrSlug],
    queryFn: async () => await productApi.getProductDetail(idOrSlug),
    enabled: Boolean(idOrSlug),
  });

/**
 * Hook to fetch reviews list of a product.
 *
 * @param idOrSlug UUID or Slug of the product
 * @param params Query parameters like page and limit
 * @returns Query result containing reviews pagination list
 */
export const useProductReviewsQuery = (
  idOrSlug: string,
  params?: { page?: number; limit?: number },
) =>
  useQuery({
    queryKey: ['product-reviews', idOrSlug, params],
    queryFn: async () => await productApi.getProductReviews(idOrSlug, params),
    enabled: Boolean(idOrSlug),
  });

/**
 * Hook to toggle wishlist status of a product.
 *
 * @returns Mutation object for toggling wishlist
 */
export const useToggleWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => await wishlistApi.toggleWishlist(productId),
    onSuccess: () => {
      // Invalidate products lists and product details to refresh wishlist indicators
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};
