import type { PaginationMeta } from '@/features/products/types/product';

export type SellerProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  is_active: boolean;
  primary_image?: string;
  category_name: string;
  category_id: string;
  total_sold: number;
  created_at: string;
};

export type SellerProductListResponse = {
  data: SellerProduct[];
  meta: PaginationMeta;
};

export type CreateProductRequest = {
  name: string;
  price: number;
  stock: number;
  description: string;
  category_id: string;
  is_active: boolean;
};

export type UpdateProductRequest = Partial<CreateProductRequest>;
