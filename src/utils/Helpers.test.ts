import { describe, expect, it } from 'vitest';
import { routing } from '@/libs/I18nRouting';
import { getI18nPath, getImageUrl } from './Helpers';

describe('Helpers', () => {
  describe('I18n path helper', () => {
    it('keeps path unchanged when locale is default', () => {
      const url = '/random-url';
      const locale = routing.defaultLocale;

      expect(getI18nPath(url, locale)).toBe(url);
    });

    it('prefixes path with locale when locale is not default', () => {
      const url = '/random-url';
      const locale = 'id';

      expect(getI18nPath(url, locale)).toBe(`/id${url}`);
    });
  });

  describe('Image URL helper', () => {
    it('returns original url when url is non-empty string', () => {
      expect(getImageUrl('/image.png', '/fallback.png')).toBe('/image.png');
    });

    it('returns fallback image when url is empty or whitespace or nullish', () => {
      expect(getImageUrl('', '/fallback.png')).toBe('/fallback.png');
      expect(getImageUrl('   ', '/fallback.png')).toBe('/fallback.png');
      expect(getImageUrl(null, '/fallback.png')).toBe('/fallback.png');
      expect(getImageUrl(undefined, '/fallback.png')).toBe('/fallback.png');
    });
  });
});
