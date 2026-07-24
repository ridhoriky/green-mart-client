import { describe, it, expect } from 'vitest';
import { formatTime, getMockDiscount } from './helpers';

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
});
