import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedFarmers() {
  const t = useTranslations('Index.FeaturedFarmers');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg">{t('title')}</h2>
        <Link className="font-label-bold text-primary hover:underline" href="/">
          {t('view_all')}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        <div className="group rounded-2xl border border-outline-variant bg-white p-6 text-center transition-all hover:shadow-xl">
          <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
            <Image
              src="/assets/images/farmer-01.jpg"
              alt="Farmer Junaid"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Farmer Junaid</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Highland Farms, CA
          </p>
          <button className="w-full rounded-lg border border-primary py-2 font-label-bold text-primary transition-colors hover:bg-primary hover:text-white">
            {t('visit_store')}
          </button>
        </div>

        <div className="group rounded-2xl border border-outline-variant bg-white p-6 text-center transition-all hover:shadow-xl">
          <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
            <Image
              src="/assets/images/farmer-02.jpg"
              alt="Sarah's Greens"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Sarah's Greens</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Valley Eco Farm, OR
          </p>
          <button className="w-full rounded-lg border border-primary py-2 font-label-bold text-primary transition-colors hover:bg-primary hover:text-white">
            {t('visit_store')}
          </button>
        </div>

        <div className="group hidden rounded-2xl border border-outline-variant bg-white p-6 text-center transition-all hover:shadow-xl sm:block">
          <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
            <Image
              src="/assets/images/farmer-03.jpg"
              alt="Old Oak Farm"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Old Oak Farm</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Heritage Hills, TX
          </p>
          <button className="w-full rounded-lg border border-primary py-2 font-label-bold text-primary transition-colors hover:bg-primary hover:text-white">
            {t('visit_store')}
          </button>
        </div>

        <div className="group hidden rounded-2xl border border-outline-variant bg-white p-6 text-center transition-all hover:shadow-xl lg:block">
          <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
            <Image
              src="/assets/images/farmer-04.jpg"
              alt="Citrus Grove Co."
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Citrus Grove Co.</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Sunshine Valley, FL
          </p>
          <button className="w-full cursor-pointer rounded-lg border border-primary py-2 font-label-bold text-primary transition-colors hover:bg-primary hover:text-white">
            {t('visit_store')}
          </button>
        </div>
      </div>
    </section>
  );
}
