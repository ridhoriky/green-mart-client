import { useTranslations } from 'next-intl';
import * as React from 'react';
import { formatTime } from '../utils/helpers';

/**
 * Renders the top banner for the Flash Sale catalog page, including a ticking countdown.
 *
 * @returns The Flash Sale banner element.
 */
export function FlashSaleBanner() {
  const t = useTranslations('FlashSalePage');

  const [timeLeft, setTimeLeft] = React.useState(2 * 3600 + 45 * 60 + 12);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-orange-600 p-8 text-white shadow-lg md:p-12">
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
            {t('save_percent', { percent: 50 })}
          </span>
          <h1 className="mb-2 flex items-center gap-2 font-headline-lg text-4xl font-black tracking-tight md:text-5xl">
            <span
              className="material-symbols-outlined animate-pulse text-[36px] text-yellow-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            {t('title')}
          </h1>
          <p className="font-body-lg text-white/90">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-black/20 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:gap-4">
          <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
            {t('ends_in')}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-headline-lg text-xl font-black text-rose-600 shadow-md">
              {h}
            </div>
            <span className="font-black text-white">:</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-headline-lg text-xl font-black text-rose-600 shadow-md">
              {m}
            </div>
            <span className="font-black text-white">:</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-headline-lg text-xl font-black text-rose-600 shadow-md">
              {s}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 right-1/4 hidden -translate-y-1/2 text-9xl font-black text-white/5 select-none md:block">
        ⚡
      </div>
    </div>
  );
}
