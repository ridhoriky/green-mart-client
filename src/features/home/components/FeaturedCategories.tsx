import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function FeaturedCategories() {
  const t = useTranslations('Index.FeaturedCategories');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <h2 className="mb-8 font-headline-lg text-headline-lg">{t('title')}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl">
          <Image
            src="/assets/images/categories-01.jpg"
            alt="Vegetables"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <h3 className="mb-1 font-headline-lg text-headline-lg-mobile">{t('cat_vegetables')}</h3>
            <p className="text-body-sm opacity-90">{t('desc_vegetables')}</p>
          </div>
        </div>
        <div className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl">
          <Image
            src="/assets/images/categories-02.jpg"
            alt="Fresh Fruits"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <h3 className="mb-1 font-headline-lg text-headline-lg-mobile">{t('cat_fruits')}</h3>
            <p className="text-body-sm opacity-90">{t('desc_fruits')}</p>
          </div>
        </div>
        <div className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl">
          <Image
            src="/assets/images/categories-03.jpg"
            alt="Grains & Rice"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <h3 className="mb-1 font-headline-lg text-headline-lg-mobile">{t('cat_grains')}</h3>
            <p className="text-body-sm opacity-90">{t('desc_grains')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
