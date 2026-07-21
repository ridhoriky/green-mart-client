import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '@/features/orders/api/orderApi';
import type { CheckoutRequest, OrderQueryParams } from '@/features/orders/types/order';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Hook to fetch the paginated list of the user's orders.
 * @param params - Query parameters.
 * @returns Query result.
 */
export const useOrdersQuery = (params?: OrderQueryParams) =>
  useQuery({
    queryKey: ['orders', params],
    queryFn: async () => await orderApi.getOrders(params),
  });

/**
 * Hook to fetch the details of a specific order.
 * @param orderId - Order UUID.
 * @returns Query result.
 */
export const useOrderDetailQuery = (orderId: string) =>
  useQuery({
    queryKey: ['orders', orderId],
    queryFn: async () => await orderApi.getOrderDetail(orderId),
    enabled: Boolean(orderId),
  });

/**
 * Hook to handle checkout mutation.
 * @returns Mutation object.
 */
export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CheckoutRequest) => await orderApi.checkout(data),
    onSuccess: (orders) => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
      const [firstOrder] = orders;
      if (firstOrder) {
        router.push(`/account/orders/${firstOrder.id}`);
      } else {
        router.push('/account/orders');
      }
    },
  });
};

/**
 * Hook to cancel a pending order.
 * @returns Mutation object.
 */
export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => await orderApi.cancelOrder(orderId),
    onSuccess: (_data, orderId) => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
    },
  });
};

/**
 * Hook to confirm an order has been received.
 * @returns Mutation object.
 */
export const useConfirmOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => await orderApi.confirmOrder(orderId),
    onSuccess: (_data, orderId) => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
    },
  });
};
