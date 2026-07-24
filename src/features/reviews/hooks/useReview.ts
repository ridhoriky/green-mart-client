import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '@/features/reviews/api/reviewApi';
import type { CreateReviewRequest } from '@/features/reviews/types/review';

/**
 * Hook to create a product review.
 * @returns Mutation object for creating a review.
 */
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewRequest) => await reviewApi.createReview(data),
    onSuccess: (_, variables) => {
      // Invalidate the product reviews query to reflect the newly added review
      void queryClient.invalidateQueries({
        queryKey: ['product-reviews', variables.product_id],
      });
      // Optionally invalidate product detail to update review aggregates
      void queryClient.invalidateQueries({
        queryKey: ['product', variables.product_id],
      });
    },
  });
};
