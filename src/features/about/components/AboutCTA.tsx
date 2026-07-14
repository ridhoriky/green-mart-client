import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';

export function AboutCTA() {
  const t = useTranslations('About');

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-center text-white shadow-2xl md:px-16 md:py-20">
          {/* Background decorative blob */}
          <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-4 font-display-lg text-3xl font-extrabold tracking-tight md:text-4xl">
              {t('cta_title')}
            </h2>
            <p className="mb-10 font-body-lg text-body-lg text-white/95 opacity-90">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'w-full border-white/30 bg-white text-primary font-bold hover:bg-white/90 sm:w-auto px-8 py-6 rounded-xl shadow-lg transition-all',
                })}
              >
                <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
                {t('cta_shop')}
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'w-full border-white/30 bg-white/15 text-white font-bold hover:bg-white/25 sm:w-auto px-8 py-6 rounded-xl shadow-lg transition-all',
                })}
              >
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                {t('cta_farmer')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
