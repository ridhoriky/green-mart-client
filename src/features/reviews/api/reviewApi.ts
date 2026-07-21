import type { APIResponse } from '@/features/auth/types/auth';
import type { CreateReviewRequest, ReviewResponse } from '@/features/reviews/types/review';
import { apiClient } from '@/libs/apiClient';

export const reviewApi = {
  /**
   * Create a new product review.
   * @param data Create review request payload.
   * @returns Created review response.
   */
  createReview: async (data: CreateReviewRequest): Promise<ReviewResponse> => {
    const res = await apiClient.post<APIResponse<ReviewResponse>>('/reviews', data);
    return res.data.data;
  },
};
