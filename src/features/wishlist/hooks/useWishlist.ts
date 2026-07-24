import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Product,
  ProductDetail,
  ProductListResponse,
} from '@/features/products/types/product';
import { wishlistApi } from '@/features/wishlist/api/wishlistApi';
import type { WishlistResponse } from '@/features/wishlist/types/wishlist';

/**
 * Hook to fetch the user's wishlist items.
 *
 * @returns Query result containing the wishlist items and total count
 */
export const useWishlistQuery = () =>
  useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => await wishlistApi.getWishlist(),
  });

/**
 * Hook to toggle wishlist status of a product with optimistic updates.
 *
 * @returns Mutation object for toggling wishlist
 */
export const useToggleWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => await wishlistApi.toggleWishlist(productId),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      await queryClient.cancelQueries({ queryKey: ['products'] });
      await queryClient.cancelQueries({ queryKey: ['product'] });

      const previousWishlist = queryClient.getQueryData<WishlistResponse>(['wishlist']);

      let productToToggle: Product | undefined;

      const productQueries = queryClient.getQueriesData<ProductListResponse>({
        queryKey: ['products'],
      });
      for (const [queryKey, data] of productQueries) {
        if (data?.data) {
          const found = data.data.find((p) => p.id === productId);
          if (found) {
            productToToggle = found;
            queryClient.setQueryData<ProductListResponse>(queryKey, {
              ...data,
              data: data.data.map((p) =>
                p.id === productId ? { ...p, is_in_wishlist: !p.is_in_wishlist } : p,
              ),
            });
          }
        }
      }

      const detailQueries = queryClient.getQueriesData<ProductDetail>({ queryKey: ['product'] });
      for (const [queryKey, data] of detailQueries) {
        if (data && data.id === productId) {
          productToToggle ??= {
            id: data.id,
            slug: data.slug,
            name: data.name,
            price: data.price,
            description: data.description,
            stock: data.stock,
            category_id: data.category.id,
            category_name: data.category.name,
            store_id: data.store.id,
            store_name: data.store.name,
            store_slug: data.store.slug,
            store_is_verified: data.store.is_verified,
            rating_avg: data.rating_avg,
            total_sold: data.total_sold,
            primary_image: data.images.find((img) => img.is_primary)?.url ?? '',
            is_active: data.is_active,
            is_in_wishlist: data.is_in_wishlist,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
          queryClient.setQueryData<ProductDetail>(queryKey, {
            ...data,
            is_in_wishlist: !data.is_in_wishlist,
          });
        }
      }

      if (previousWishlist && productToToggle) {
        const isCurrentlyInWishlist = productToToggle.is_in_wishlist;

        let newItems = [...previousWishlist.items];
        if (isCurrentlyInWishlist) {
          newItems = newItems.filter((item) => item.product.id !== productId);
        } else {
          newItems.push({
            id: `temp-${productId}-${Date.now()}`,
            product: {
              ...productToToggle,
              is_in_wishlist: true,
            },
            added_at: new Date().toISOString(),
          });
        }

        queryClient.setQueryData<WishlistResponse>(['wishlist'], {
          ...previousWishlist,
          items: newItems,
          total_items: newItems.length,
        });
      }

      return { previousWishlist };
    },
    onError: (_err, productId, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(['wishlist'], context.previousWishlist);
      }

      const productQueries = queryClient.getQueriesData<ProductListResponse>({
        queryKey: ['products'],
      });
      for (const [queryKey, data] of productQueries) {
        if (data?.data) {
          queryClient.setQueryData<ProductListResponse>(queryKey, {
            ...data,
            data: data.data.map((p) =>
              p.id === productId ? { ...p, is_in_wishlist: !p.is_in_wishlist } : p,
            ),
          });
        }
      }

      const detailQueries = queryClient.getQueriesData<ProductDetail>({ queryKey: ['product'] });
      for (const [queryKey, data] of detailQueries) {
        if (data && data.id === productId) {
          queryClient.setQueryData<ProductDetail>(queryKey, {
            ...data,
            is_in_wishlist: !data.is_in_wishlist,
          });
        }
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};
