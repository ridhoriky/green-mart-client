import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sellerStoreApi } from '@/features/seller/api/sellerStoreApi';
import type { SellerReportParams, UpdateStoreRequest } from '@/features/seller/types/seller-store';

const sellerStoreKeys = {
  all: ['seller-store'] as const,
  mine: () => [...sellerStoreKeys.all, 'me'] as const,
  stats: () => [...sellerStoreKeys.all, 'stats'] as const,
  summary: (params?: SellerReportParams) => [...sellerStoreKeys.all, 'summary', params] as const,
  topProducts: (params?: SellerReportParams) =>
    [...sellerStoreKeys.all, 'top-products', params] as const,
};

/**
 * Fetches the current seller's store profile.
 * @returns Query result containing the store profile.
 */
export const useMyStoreQuery = () =>
  useQuery({
    queryKey: sellerStoreKeys.mine(),
    queryFn: async () => await sellerStoreApi.getMyStore(),
  });

/**
 * Updates current seller store profile.
 * @returns Mutation result for store profile update.
 */
export const useUpdateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStoreRequest) => await sellerStoreApi.updateMyStore(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sellerStoreKeys.all });
    },
  });
};

/**
 * Fetches seller store quick statistics.
 * @returns Query result containing store statistics.
 */
export const useStoreStatsQuery = () =>
  useQuery({
    queryKey: sellerStoreKeys.stats(),
    queryFn: async () => await sellerStoreApi.getStoreStats(),
  });

/**
 * Fetches seller sales summary report.
 * @param params - Query parameters for filtering report.
 * @returns Query result containing sales summary.
 */
export const useSellerSummaryQuery = (params?: SellerReportParams) =>
  useQuery({
    queryKey: sellerStoreKeys.summary(params),
    queryFn: async () => await sellerStoreApi.getSellerSummary(params),
  });

/**
 * Fetches seller top products report.
 * @param params - Query parameters for filtering top products.
 * @returns Query result containing top products.
 */
export const useSellerTopProductsQuery = (params?: SellerReportParams) =>
  useQuery({
    queryKey: sellerStoreKeys.topProducts(params),
    queryFn: async () => await sellerStoreApi.getSellerTopProducts(params),
  });
