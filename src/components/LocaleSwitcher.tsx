'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }

    const { search } = window.location;
    router.push(`${pathname}${search}`, { locale: newLocale, scroll: false });
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-low p-1 shadow-xs transition-all"
      aria-label={t('change_language')}
    >
      {routing.locales.map((elt) => {
        const isActive = elt === locale;
        return (
          <button
            key={elt}
            onClick={() => {
              handleLocaleChange(elt);
            }}
            className={`cursor-pointer rounded-full px-3 py-1 font-label-bold text-label-bold tracking-wider uppercase transition-all select-none ${
              isActive
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-secondary hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            {elt.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};
