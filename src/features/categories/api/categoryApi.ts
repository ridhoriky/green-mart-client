import type { APIResponse } from '@/features/auth/types/auth';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { apiClient } from '@/libs/apiClient';

export const categoryApi = {
  /**
   * Get list of categories in a tree structure.
   * @returns Category tree node list.
   */
  getCategories: async (): Promise<CategoryTreeNode[]> => {
    const res = await apiClient.get<APIResponse<CategoryTreeNode[]>>('/categories');
    return res.data.data;
  },
};
