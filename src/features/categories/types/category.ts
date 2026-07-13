export type CategoryTreeNode = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  product_count: number;
  sort_order: number;
  children: CategoryTreeNode[];
};
