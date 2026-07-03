import { useTranslations } from 'next-intl';

export function Newsletter() {
  const t = useTranslations('Index.Newsletter');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="rounded-3xl bg-surface-container-highest p-12 text-center">
        <h2 className="mb-4 font-headline-lg text-headline-lg">{t('title')}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-body-lg text-on-surface-variant">{t('desc')}</p>
        <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <input
            className="flex-1 rounded-xl border-transparent bg-white px-6 py-4 focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t('placeholder')}
            type="email"
            aria-label="Email address"
          />
          <button className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-primary-container active:scale-95">
            {t('subscribe_button')}
          </button>
        </div>
        <p className="mt-4 text-[12px] text-on-surface-variant">{t('privacy_note')}</p>
      </div>
    </section>
  );
}
