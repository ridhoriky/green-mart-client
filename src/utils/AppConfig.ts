import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'GreenMart',
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localePrefix,
  },
};
