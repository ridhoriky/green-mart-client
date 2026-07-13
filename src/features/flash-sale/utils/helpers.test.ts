import { describe, it, expect } from 'vitest';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { formatTime, getMockDiscount, isCategoryMatch, findCategoryName } from './helpers';

describe('Flash Sale helpers logic', () => {
  describe('formatTime helper', () => {
    it('formats seconds to HH:MM:SS object padded correctly', () => {
      const time = formatTime(3665); // 1 hour, 1 minute, 5 seconds
      expect(time).toStrictEqual({ h: '01', m: '01', s: '05' });
    });
  });

  describe('getMockDiscount helper', () => {
    it('returns a mock discount between 20 and 50 percent based on productId', () => {
      const discount = getMockDiscount('prod-abc');
      expect([20, 25, 30, 35, 40, 45, 50]).toContain(discount);
    });
  });

  describe('isCategoryMatch helper', () => {
    const node: CategoryTreeNode = {
      id: 'rice-grains',
      name: 'Rice Grains',
      product_count: 8,
      sort_order: 1,
      children: [],
    };

    it('returns false for empty query categoryParam', () => {
      expect(isCategoryMatch(node, '')).toBeFalsy();
    });

    it('returns true when exact ID matches', () => {
      expect(isCategoryMatch(node, 'rice-grains')).toBeTruthy();
    });

    it('returns true when category name matches case-insensitively', () => {
      expect(isCategoryMatch(node, 'rice grains')).toBeTruthy();
    });
  });

  describe('findCategoryName helper', () => {
    const tree: CategoryTreeNode[] = [
      {
        id: 'dairy',
        name: 'Dairy',
        product_count: 4,
        sort_order: 1,
        children: [
          {
            id: 'fresh-milk',
            name: 'Fresh Milk',
            product_count: 2,
            sort_order: 1,
            children: [],
          },
        ],
      },
    ];

    it('finds matching category name in nested tree', () => {
      expect(findCategoryName(tree, 'fresh-milk')).toBe('Fresh Milk');
    });

    it('returns null if category is not found', () => {
      expect(findCategoryName(tree, 'non-existent')).toBeNull();
    });
  });
});
