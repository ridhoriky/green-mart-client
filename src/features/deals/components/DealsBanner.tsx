import { useTranslations } from 'next-intl';

/**
 * Renders the top banner for the Deals catalog page.
 *
 * @returns The Deals banner element.
 */
export function DealsBanner() {
  const t = useTranslations('DealsPage');

  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 p-8 text-white shadow-lg md:p-12">
      <div className="relative z-10 max-w-2xl">
        <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
          {t('save_percent', { percent: 50 })}
        </span>
        <h1 className="mb-4 font-headline-lg text-4xl font-black tracking-tight md:text-5xl">
          {t('title')}
        </h1>
        <p className="font-body-lg text-white/90">{t('subtitle')}</p>
      </div>
      <div className="absolute top-1/2 right-10 hidden -translate-y-1/2 text-9xl font-black text-white/10 select-none md:block">
        %
      </div>
    </div>
  );
}
