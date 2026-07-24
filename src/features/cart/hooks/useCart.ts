import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/authStore';
import { cartApi } from '@/features/cart/api/cartApi';

/**
 * Retrieves the current user's shopping cart.
 *
 * @returns Query object for the cart query.
 */
export const useCartQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => await cartApi.getCart(),
    enabled: Boolean(accessToken),
  });
};

/**
 * Adds a product to the shopping cart.
 *
 * @returns Mutation object for adding item to cart.
 */
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { productId: string; quantity: number }) =>
      await cartApi.addToCart(props.productId, props.quantity),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

/**
 * Updates the quantity of a product inside the shopping cart.
 *
 * @returns Mutation object for updating cart item quantity.
 */
export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { cartItemId: string; quantity: number }) =>
      await cartApi.updateCartItem(props.cartItemId, props.quantity),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

/**
 * Removes an item from the shopping cart.
 *
 * @returns Mutation object for removing item from cart.
 */
export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: string) => await cartApi.removeCartItem(cartItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

/**
 * Clears all items from the shopping cart.
 *
 * @returns Mutation object for clearing the cart.
 */
export const useClearCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await cartApi.clearCart(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
