import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sellerProductApi } from '../api/sellerProductApi';
import type { CreateProductRequest, UpdateProductRequest } from '../types/seller-product';

const sellerProductKeys = {
  all: ['seller-products'] as const,
  lists: () => [...sellerProductKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...sellerProductKeys.lists(), params] as const,
  details: () => [...sellerProductKeys.all, 'detail'] as const,
  detail: (id: string) => [...sellerProductKeys.details(), id] as const,
};

export const useSellerProductsQuery = (params?: Record<string, unknown>) =>
  useQuery({
    queryKey: sellerProductKeys.list(params),
    queryFn: async () => await sellerProductApi.getMyProducts(params),
  });

export const useSellerProductDetailQuery = (id: string) =>
  useQuery({
    queryKey: sellerProductKeys.detail(id),
    queryFn: async () => await sellerProductApi.getMyProductDetail(id),
    enabled: !!id,
  });

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductRequest) => await sellerProductApi.createProduct(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.lists() });
    },
  });
};

export const useUpdateProductMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProductRequest) =>
      await sellerProductApi.updateProduct(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.detail(id) });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await sellerProductApi.deleteProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.lists() });
    },
  });
};

export const useAddProductImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      await sellerProductApi.addProductImage(id, formData);
    },
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.detail(variables.id) });
      void queryClient.invalidateQueries({ queryKey: sellerProductKeys.lists() });
    },
  });
};

// export const useDeleteProductImageMutation = (id: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn:  async (imageId: string) => sellerProductApi.deleteProductImage(id, imageId),
//     onSuccess: () => {
//       void queryClient.invalidateQueries({ queryKey: sellerProductKeys.detail(id) });
//     },
//   });
// };
//
// export const useSetPrimaryImageMutation = (id: string) => {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn:  async (imageId: string) => sellerProductApi.setPrimaryImage(id, imageId),
//     onSuccess: () => {
//       void queryClient.invalidateQueries({ queryKey: sellerProductKeys.detail(id) });
//       void queryClient.invalidateQueries({ queryKey: sellerProductKeys.lists() });
//     },
//   });
// };
