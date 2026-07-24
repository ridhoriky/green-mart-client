export type CreateStoreRequest = {
  store_name: string;
  description?: string;
};

export type StoreResponse = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  is_verified: boolean;
  rating_avg: number;
  total_sales: number;
  created_at: string;
  updated_at: string;
};

export type OrderSummary = {
  id: string;
  order_number?: string;
  buyer_name: string;
  status: string;
  total_amount: number;
  created_at: string;
};

type ProductLowStock = {
  id: string;
  name: string;
  stock: number;
};

type SellerSalesSummary = {
  total_revenue: number;
  total_orders: number;
  total_items_sold: number;
  average_order_value: number;
  conversion_rate: number;
  period: string;
};

export type SellerTopProduct = {
  product_id: string;
  product_name: string;
  total_sold: number;
  revenue: number;
  average_rating: number;
};

export type SellerDashboard = {
  summary: SellerSalesSummary;
  recent_orders: OrderSummary[];
  top_products: SellerTopProduct[];
  low_stock_items: ProductLowStock[];
  pending_orders: number;
};
