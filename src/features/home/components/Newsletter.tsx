import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const t = useTranslations('Index.Newsletter');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="rounded-3xl bg-surface-container-highest p-12 text-center">
        <h2 className="mb-4 font-headline-lg text-headline-lg">{t('title')}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-body-lg text-on-surface-variant">{t('desc')}</p>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 sm:flex-row">
          <Input
            variant="primary"
            size="large"
            className="flex-1 rounded-xl border-transparent bg-white focus-visible:border-primary focus-visible:ring-primary"
            placeholder={t('placeholder')}
            type="email"
            aria-label="Email address"
          />
          <Button
            variant="primary"
            size="large"
            className="w-full rounded-xl px-8 font-bold shadow-md sm:w-auto"
          >
            {t('subscribe_button')}
          </Button>
        </div>
        <p className="mt-4 text-[12px] text-on-surface-variant">{t('privacy_note')}</p>
      </div>
    </section>
  );
}
