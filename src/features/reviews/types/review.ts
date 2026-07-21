/**
 * Represents a request to create a product review.
 */
export type CreateReviewRequest = {
  order_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  images?: string[];
};

/**
 * Represents a review response from the API.
 */
export type ReviewResponse = {
  id: string;
  buyer_name: string;
  buyer_avatar?: string;
  rating: number;
  comment?: string;
  images: string[];
  seller_reply?: string;
  seller_replied_at?: string;
  created_at: string;
};
