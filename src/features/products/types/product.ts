type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: string;
  category_name: string;
  store_id: string;
  store_name: string;
  store_slug: string;
  store_is_verified: boolean;
  rating_avg: number;
  total_sold: number;
  primary_image: string;
  is_active: boolean;
  is_in_wishlist: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductListResponse = {
  data: Product[];
  meta: PaginationMeta;
};

type CategorySummary = {
  id: string;
  name: string;
};

type ProductStoreSummary = {
  id: string;
  slug: string;
  name: string;
  logo_url?: string;
  rating_avg: number;
  is_verified: boolean;
};

export type ProductImage = {
  id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: CategorySummary;
  store: ProductStoreSummary;
  images: ProductImage[];
  is_active: boolean;
  is_in_wishlist: boolean;
  rating_avg: number;
  total_reviews: number;
  total_sold: number;
  created_at: string;
  updated_at: string;
};

type ProductReview = {
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

export type ReviewListResponse = {
  average_rating: number;
  total_reviews: number;
  items: ProductReview[];
  meta: PaginationMeta;
};

export type ProductQueryParams = {
  q?: string;
  category?: string;
  store?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  in_stock?: boolean;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
};
