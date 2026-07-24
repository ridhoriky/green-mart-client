import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/features/categories/api/categoryApi';

/**
 * Hook to fetch categories hierarchical tree.
 *
 * @returns Query result containing hierarchical categories list
 */
export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => await categoryApi.getCategories(),
  });
