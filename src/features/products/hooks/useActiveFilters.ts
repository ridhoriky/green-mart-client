import { useTranslations } from 'next-intl';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { findCategoryName } from '../utils/helpers';

/**
 * Custom hook to generate a list of active filters with user-friendly labels.
 *
 * @param params - The filter values, data, and translation namespace.
 * @returns Array of active filters with label and key.
 */
export function useActiveFilters(params: {
  q: string;
  category: string;
  categoriesData?: CategoryTreeNode[];
  minPrice: string;
  maxPrice: string;
  rating: string;
  inStock: boolean;
  translationNamespace: 'ProductsPage' | 'DealsPage' | 'FlashSalePage';
}) {
  const t = useTranslations(params.translationNamespace);
  const activeFilters: { label: string; key: string }[] = [];

  if (params.q) {
    activeFilters.push({ label: `"${params.q}"`, key: 'q' });
  }
  if (params.category && params.categoriesData) {
    const catName = findCategoryName(params.categoriesData, params.category);
    if (catName) {
      activeFilters.push({ label: catName, key: 'category' });
    }
  }
  if (params.minPrice || params.maxPrice) {
    const minLabel = params.minPrice
      ? `Rp ${Number(params.minPrice).toLocaleString('id-ID')}`
      : 'Rp 0';
    const maxLabel = params.maxPrice
      ? `Rp ${Number(params.maxPrice).toLocaleString('id-ID')}`
      : '∞';
    activeFilters.push({ label: `${minLabel} - ${maxLabel}`, key: 'price' });
  }
  if (params.rating) {
    activeFilters.push({ label: `${params.rating}+ ★`, key: 'rating' });
  }
  if (params.inStock) {
    activeFilters.push({ label: t('in_stock_only'), key: 'in_stock' });
  }
  return activeFilters;
}
