import { useTranslations } from 'next-intl';

type ValueItemProps = {
  icon: string;
  title: string;
  description: string;
};

function ValueItem(props: ValueItemProps) {
  return (
    <div className="product-card-hover rounded-3xl bg-surface-container-low p-8 transition-all duration-300">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined text-2xl">{props.icon}</span>
      </div>
      <h3 className="mb-3 font-title-md text-xl font-bold text-on-background">{props.title}</h3>
      <p className="text-body-md font-body-sm leading-relaxed text-on-surface-variant">
        {props.description}
      </p>
    </div>
  );
}

export function AboutValues() {
  const t = useTranslations('About');

  return (
    <section className="py-12">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 text-center">
          <h2 className="font-display-lg text-3xl font-bold text-primary">{t('values_title')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ValueItem icon="verified" title={t('value1_title')} description={t('value1_desc')} />
          <ValueItem icon="handshake" title={t('value2_title')} description={t('value2_desc')} />
          <ValueItem icon="eco" title={t('value3_title')} description={t('value3_desc')} />
          <ValueItem icon="groups" title={t('value4_title')} description={t('value4_desc')} />
        </div>
      </div>
    </section>
  );
}
