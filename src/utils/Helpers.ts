import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';

/**
 * Resolves the public base URL of the application.
 * @returns The configured public app URL or the local development URL.
 */
export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

/**
 * Builds a locale-aware path by prefixing non-default locales.
 * @param url The base application-relative path starting with a slash.
 * @param locale The active locale identifier.
 * @returns The localized path, prefixed when the locale is not the default locale.
 */
export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

/**
 * Safely resolves an image URL by returning a fallback image if the URL is empty or whitespace.
 * @param url The image URL string which may be empty, null, or undefined.
 * @param fallback The fallback image path to use if url is empty. Defaults to '/assets/images/placeholder.png'.
 * @returns Non-empty image URL string.
 */
export const getImageUrl = (
  url: string | null | undefined,
  fallback = '/assets/images/placeholder.png',
) => {
  if (!url || url.trim() === '') {
    return fallback;
  }

  return url;
};
