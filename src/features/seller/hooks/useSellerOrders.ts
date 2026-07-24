import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sellerOrderApi } from '../api/sellerOrderApi';
import type { SellerOrderQueryParams, UpdateOrderStatusRequest } from '../types/seller-order';

const sellerOrderKeys = {
  all: ['seller-orders'] as const,
  lists: () => [...sellerOrderKeys.all, 'list'] as const,
  list: (params?: SellerOrderQueryParams) => [...sellerOrderKeys.lists(), params] as const,
  details: () => [...sellerOrderKeys.all, 'detail'] as const,
  detail: (id: string) => [...sellerOrderKeys.details(), id] as const,
};

/**
 * Hook to fetch paginated seller orders list.
 * @param params - Optional query parameters.
 * @returns Query result object.
 */
export const useSellerOrdersQuery = (params?: SellerOrderQueryParams) =>
  useQuery({
    queryKey: sellerOrderKeys.list(params),
    queryFn: async () => await sellerOrderApi.getSellerOrders(params),
  });

/**
 * Hook to fetch detailed seller order information.
 * @param id - The order ID.
 * @returns Query result object.
 */
export const useSellerOrderDetailQuery = (id: string) =>
  useQuery({
    queryKey: sellerOrderKeys.detail(id),
    queryFn: async () => await sellerOrderApi.getSellerOrderDetail(id),
    enabled: !!id,
  });

/**
 * Hook to update a seller order status.
 * @param id - The order ID.
 * @returns Mutation result object.
 */
export const useUpdateOrderStatusMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateOrderStatusRequest) => {
      await sellerOrderApi.updateOrderStatus(id, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sellerOrderKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: sellerOrderKeys.detail(id) });
    },
  });
};
