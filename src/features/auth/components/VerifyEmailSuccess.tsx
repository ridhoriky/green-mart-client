'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/libs/I18nNavigation';

export const VerifyEmailSuccess = () => {
  const t = useTranslations('VerifyEmail');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-on-surface">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary-fixed-dim/10 blur-[120px]"></div>
        <div className="absolute right-[-5%] bottom-[-5%] h-[30%] w-[30%] rounded-full bg-secondary-container/30 blur-[100px]"></div>
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-margin-mobile py-8 md:py-12">
        <div className="my-auto w-full max-w-md animate-fade-in-up">
          {/* Header/Logo Area */}
          <div className="mb-8 flex flex-col items-center text-center">
            {/* Logo Wrapper */}
            <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-lowest shadow-sm ring-1 ring-outline-variant/10">
              <Image
                src="/assets/images/logo.png"
                alt="GreenMart Logo"
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain"
              />
            </div>
            <h2 className="font-label-bold text-label-bold tracking-widest text-primary uppercase">
              GreenMart
            </h2>
          </div>

          {/* Success Card */}
          <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest px-6 py-8 text-center shadow-sm md:p-10">
            {/* Animated Checkmark Container */}
            <div className="group relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="material-symbols-outlined text-[40px] text-primary transition-transform duration-300 group-hover:scale-110">
                check_circle
              </span>
            </div>

            <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-surface md:font-headline-lg md:text-headline-lg">
              {t('success_title')}
            </h1>
            <p className="mb-stack-lg font-title-md text-title-md leading-snug text-primary">
              {t('success_subtitle')}
            </p>
            <p className="mb-stack-lg px-4 font-body-lg text-body-lg text-secondary">
              {t('success_description')}
            </p>

            {/* Actions */}
            <div className="space-y-stack-md">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: 'primary', size: 'large' }), 'w-full')}
              >
                {t('go_to_marketplace')}
              </Link>
              <div className="flex items-center justify-center gap-stack-sm pt-stack-sm">
                <span className="font-body-sm text-body-sm text-secondary">{t('need_help')}</span>
                <Link
                  className="font-body-sm text-body-sm font-bold text-primary transition-all hover:underline"
                  href="#"
                >
                  {t('contact_support')}
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Social Proof or Hint */}
          <div className="mt-stack-lg flex flex-col items-center opacity-70">
            <div className="mb-stack-sm flex -space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-surface">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_6Ur5raNp3NFLDZEDi7buRXvXl64ZlAewcqJZ_iXtUqTT2AxnqPcNR5av8_6kqWaNQUZ2c9F0NAiolgqHsSsqotOQCGE_gbiENruVEUfgJRilM7NbMRWFm0KQ3iE3EyvZj0BQzQAj2Q2nMukYch-uMJzHDAxtJ-tv-C1vhBY-GTgVer7P4WGv5UDSbnXtx8EHKAKzuOu6DqEGP2aL7bcw83RxB1LA0fl_EdU2H34ORMkbbSGh7zomxCKURNz8AjtBiKaSWvAu4YRH"
                  alt="Grower avatar 1"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-surface">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoeXSKST_xWwphGKznwPDBvyFiHYXEIU8jkQJpT5W0Opxr-3MDukHdeRJRejXTyfbCcb-27GKNg7RAgvd13qENC_UeyjQHIP11kP_VK7u8ard63QBo-hwz0tpCtagNMSkAvhwDKyx5EvmBpBcWCO3wWdGvsoXs3XPkzQhnCLC2QkES8SyBAberLqzbECQUtfNF6uCqRQKH2Byzy1murDFWkM60edfi_xQxHFqndWE0Ggbl2wv3GKcqHdoS25QWu1odByV-R2bG9yLP"
                  alt="Grower avatar 2"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-surface">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoiRhC2StTkhy4gYYvOJByTOS3obqbjJTiAxnkt-mNaCRw8gAuSj8D7_RmMvB4uwajLR4pFdI3uVseaxKYfg-5zZxXTLHDq-vavdmxmhtl6b0ek00w93LHbuauh4-dR87ceeqFP-PfcqFVaCbu2wv-G-d4vBpcbzt2bZBHjQCi606CUu67Qvd-AR9g2JSy7oh_MgJQ00OMRnRr6Efkuo5JabsamYeM0lmYFyealUD3V1tbv_crn3AY3tSu4gOlNRhyN4AsDjgfG79a"
                  alt="Grower avatar 3"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-label-bold text-label-bold tracking-widest text-secondary-fixed-dim uppercase">
              {t('joined_growers')}
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full py-stack-md">
        <div className="mx-auto flex max-w-container-max justify-center gap-stack-md px-margin-mobile">
          <span className="font-body-sm text-body-sm text-secondary opacity-50">
            {t('footer_copy')}
          </span>
        </div>
      </footer>
    </div>
  );
};
