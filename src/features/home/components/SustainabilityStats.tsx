import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function SustainabilityStats() {
  const t = useTranslations('Index.SustainabilityStats');

  return (
    <section className="mt-stack-lg bg-surface-container py-24">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-16 px-margin-desktop md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw6fxFPKqfhELZSFhUXI9EVgFGpb0TG0ho-j4N1yKj9t3JTyMKC81Us9mj-eHq3Ckl2c8QRBIDDw78-KiQ1v-I7Yw7w5WuHYE_3Cp1cs_wQ-N208XzN3C81DeKA5XvMmfvcqi0RewnjcEZdKfmmCO5mtLLgmCY_bWkVTYQ_XizyDhEu9-048cZ7074I4N1BiJNQE7a3I_UJ-TvnejXFAHAaGyQWn3q1I4cK_4mW4O-3hPggn6QuVdb0GDhkFalsPnfTD9WaOm9_GqW"
            alt="Sustainable farm aerial view"
            fill
            sizes="600px"
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-black/20"></div>
        </div>
        <div>
          <h2 className="mb-6 font-display-lg text-display-lg text-primary">{t('title')}</h2>
          <p className="mb-10 font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {t('desc')}
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-1 text-4xl font-bold text-primary">2,000+</div>
              <div className="text-label-bold tracking-wider text-on-surface-variant uppercase">
                {t('verified_farmers')}
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-bold text-primary">100k+</div>
              <div className="text-label-bold tracking-wider text-on-surface-variant uppercase">
                {t('eco_orders')}
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-bold text-primary">15%</div>
              <div className="text-label-bold tracking-wider text-on-surface-variant uppercase">
                {t('lower_carbon')}
              </div>
            </div>
            <div>
              <div className="mb-1 text-4xl font-bold text-primary">$5M+</div>
              <div className="text-label-bold tracking-wider text-on-surface-variant uppercase">
                {t('farmer_revenue')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
