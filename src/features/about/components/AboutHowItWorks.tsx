import { useTranslations } from 'next-intl';

type StepItemProps = {
  num: string;
  icon: string;
  title: string;
  description: string;
};

function StepItem(props: StepItemProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Number and Icon Circle */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg">
        <span className="material-symbols-outlined text-3xl">{props.icon}</span>
        <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary-fixed font-label-bold text-sm text-on-primary-fixed">
          {props.num}
        </span>
      </div>
      <h3 className="mb-3 font-title-md text-xl font-bold text-on-background">{props.title}</h3>
      <p className="text-body-md max-w-xs font-body-sm leading-relaxed text-on-surface-variant">
        {props.description}
      </p>
    </div>
  );
}

export function AboutHowItWorks() {
  const t = useTranslations('About');

  return (
    <section className="bg-surface-container py-16">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display-lg text-3xl font-bold text-primary">{t('how_title')}</h2>
          <p className="mx-auto max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            {t('how_subtitle')}
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-3">
          {/* Connector lines for desktop layout */}
          <div className="absolute top-10 right-[16.66%] left-[16.66%] -z-1 hidden h-0.5 bg-border sm:block" />

          <StepItem
            num="1"
            icon="agriculture"
            title={t('step1_title')}
            description={t('step1_desc')}
          />
          <StepItem
            num="2"
            icon="inventory_2"
            title={t('step2_title')}
            description={t('step2_desc')}
          />
          <StepItem
            num="3"
            icon="local_shipping"
            title={t('step3_title')}
            description={t('step3_desc')}
          />
        </div>
      </div>
    </section>
  );
}
