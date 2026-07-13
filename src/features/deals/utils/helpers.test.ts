import { describe, it, expect } from 'vitest';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { getMockDiscount, isCategoryMatch, findCategoryName } from './helpers';

describe('Deals helpers logic', () => {
  describe('getMockDiscount helper', () => {
    it('returns a mock discount between 15 and 50 percent based on productId', () => {
      const discount = getMockDiscount('prod-123');
      expect([15, 20, 25, 30, 35, 40, 50]).toContain(discount);
    });
  });

  describe('isCategoryMatch helper', () => {
    const node: CategoryTreeNode = {
      id: 'fresh-fruits',
      name: 'Fresh Fruits',
      product_count: 5,
      sort_order: 1,
      children: [],
    };

    it('returns false for empty query categoryParam', () => {
      expect(isCategoryMatch(node, '')).toBeFalsy();
    });

    it('returns true when exact ID matches', () => {
      expect(isCategoryMatch(node, 'fresh-fruits')).toBeTruthy();
    });

    it('returns true when category name matches case-insensitively', () => {
      expect(isCategoryMatch(node, 'fresh fruits')).toBeTruthy();
    });

    it('returns true when category name matches slugified', () => {
      expect(isCategoryMatch(node, 'fresh-fruits')).toBeTruthy();
    });
  });

  describe('findCategoryName helper', () => {
    const tree: CategoryTreeNode[] = [
      {
        id: 'vegetables',
        name: 'Vegetables',
        product_count: 10,
        sort_order: 1,
        children: [
          {
            id: 'organic',
            name: 'Organic',
            product_count: 3,
            sort_order: 1,
            children: [],
          },
        ],
      },
    ];

    it('finds matching category name in flat or nested tree', () => {
      expect(findCategoryName(tree, 'organic')).toBe('Organic');
    });

    it('returns null if category is not found', () => {
      expect(findCategoryName(tree, 'non-existent')).toBeNull();
    });
  });
});
