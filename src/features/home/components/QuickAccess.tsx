import { useTranslations } from 'next-intl';

export function QuickAccess() {
  const t = useTranslations('Index.QuickAccess');

  return (
    <section className="mx-auto mt-stack-lg grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile sm:grid-cols-2 md:px-margin-desktop lg:grid-cols-4">
      <div className="group flex cursor-pointer items-center gap-4 rounded-xl bg-surface-container-low p-6 transition-shadow hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined">local_shipping</span>
        </div>
        <div>
          <h3 className="font-title-md text-body-lg font-bold">{t('free_shipping')}</h3>
          <p className="text-body-sm text-on-surface-variant">{t('min_order')}</p>
        </div>
      </div>
      <div className="group flex cursor-pointer items-center gap-4 rounded-xl bg-surface-container-low p-6 transition-shadow hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-secondary transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined">confirmation_number</span>
        </div>
        <div>
          <h3 className="font-title-md text-body-lg font-bold">{t('new_user')}</h3>
          <p className="text-body-sm text-on-surface-variant">{t('get_discount')}</p>
        </div>
      </div>
      <div className="group flex cursor-pointer items-center gap-4 rounded-xl bg-surface-container-low p-6 transition-shadow hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined">eco</span>
        </div>
        <div>
          <h3 className="font-title-md text-body-lg font-bold">{t('organic_coll')}</h3>
          <p className="text-body-sm text-on-surface-variant">{t('certified_quality')}</p>
        </div>
      </div>
      <div className="group flex cursor-pointer items-center gap-4 rounded-xl bg-surface-container-low p-6 transition-shadow hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-secondary transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined">agriculture</span>
        </div>
        <div>
          <h3 className="font-title-md text-body-lg font-bold">{t('sell_with_us')}</h3>
          <p className="text-body-sm text-on-surface-variant">{t('farmer_program')}</p>
        </div>
      </div>
    </section>
  );
}
