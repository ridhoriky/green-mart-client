import { describe, it, expect } from 'vitest';
import { getMockDiscount } from './helpers';

describe('Deals helpers logic', () => {
  describe('getMockDiscount helper', () => {
    it('returns a mock discount between 15 and 50 percent based on productId', () => {
      const discount = getMockDiscount('prod-123');
      expect([15, 20, 25, 30, 35, 40, 50]).toContain(discount);
    });
  });
});
