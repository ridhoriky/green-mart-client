import { useTranslations } from 'next-intl';

export function CategoryMenu() {
  const t = useTranslations('Index.CategoryMenu');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="hide-scrollbar flex gap-8 overflow-x-auto py-4">
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">nutrition</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('fruits')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">spa</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('vegetables')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">grass</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('rice_grains')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">psychology_alt</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('herbs')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">verified</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('organic')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">compost</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('fertilizer')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">hand_meal</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('tools')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">group</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('farmers')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">yard</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('seeds')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">set_meal</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('meat')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">egg</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('dairy')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">
              local_fire_department
            </span>
          </div>
          <span className="font-label-bold text-body-sm">{t('spices')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">egg_alt</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('poultry')}</span>
        </div>
        <div className="group flex shrink-0 cursor-pointer flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">agriculture</span>
          </div>
          <span className="font-label-bold text-body-sm">{t('gardening')}</span>
        </div>
      </div>
    </section>
  );
}
