import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function AboutHero() {
  const t = useTranslations('About');

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary-fixed/20 via-background to-background" />
      <div className="bg-blob -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10" />
      <div className="bg-blob top-40 -right-20 h-96 w-96 rounded-full bg-primary-fixed-dim/15" />

      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text Content */}
          <div className="animate-fade-in-up lg:col-span-7">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-label-bold text-label-bold tracking-wider text-primary uppercase">
              {t('hero_badge')}
            </span>
            <h1 className="mb-6 font-display-lg text-4xl font-extrabold tracking-tight text-on-background sm:text-5xl md:text-6xl">
              {t('hero_title')}
            </h1>
            <p className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant md:text-xl">
              {t('hero_subtitle')}
            </p>
          </div>

          {/* Image Block */}
          <div className="relative aspect-video w-full animate-fade-in-up overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.01] lg:col-span-5 lg:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800"
              alt="GreenMart organic farm"
              fill
              sizes="(max-w-1024px) 100vw, 500px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
