import { useTranslations } from 'next-intl';
import { HeroBackgroundCarousel } from './HeroBackgroundCarousel';

export function HeroSection() {
  const t = useTranslations('Index.Hero');

  return (
    <section className="mx-auto mt-stack-md max-w-container-max px-margin-mobile md:px-margin-desktop">
      <div className="relative min-h-[500px] overflow-hidden rounded-2xl md:aspect-[21/9] md:min-h-0 lg:aspect-[3/1]">
        <div className="absolute inset-0 z-10 flex flex-col justify-center bg-gradient-to-r from-black/80 via-black/50 to-transparent p-6 text-white sm:p-8 md:px-12">
          <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 font-label-bold text-label-bold text-white">
            {t('seasonal_harvest')}
          </span>
          <h1 className="font-display-md text-display-md mb-4 max-w-lg md:font-display-lg md:text-display-lg">
            {t('title')}
          </h1>
          <p className="font-body-md text-body-md mb-8 max-w-md opacity-90 md:font-body-lg md:text-body-lg">
            {t('subtitle')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="w-full rounded-lg bg-primary px-8 py-3 font-label-bold text-white transition-all hover:bg-primary-container active:scale-95 sm:w-auto">
              {t('shop_now')}
            </button>
            <button className="w-full rounded-lg border border-white/30 bg-white/20 px-8 py-3 font-label-bold text-white backdrop-blur-md transition-all hover:bg-white/30 active:scale-95 sm:w-auto">
              {t('farmer_stories')}
            </button>
          </div>
        </div>
        <HeroBackgroundCarousel />
      </div>
    </section>
  );
}
