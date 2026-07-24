import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type QuickAccessItemProps = {
  icon: string;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
};

function QuickAccessItem(props: QuickAccessItemProps) {
  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-xl bg-surface-container-low p-6 transition-shadow hover:shadow-md">
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110',
          props.variant === 'secondary'
            ? 'bg-secondary-container text-secondary'
            : 'bg-primary/10 text-primary',
        )}
      >
        <span className="material-symbols-outlined">{props.icon}</span>
      </div>
      <div>
        <h3 className="font-title-md text-body-lg font-bold">{props.title}</h3>
        <p className="text-body-sm text-on-surface-variant">{props.description}</p>
      </div>
    </div>
  );
}

export function QuickAccess() {
  const t = useTranslations('Index.QuickAccess');

  return (
    <section className="mx-auto mt-stack-lg grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile sm:grid-cols-2 md:px-margin-desktop lg:grid-cols-4">
      <QuickAccessItem
        icon="local_shipping"
        title={t('free_shipping')}
        description={t('min_order')}
        variant="primary"
      />
      <QuickAccessItem
        icon="confirmation_number"
        title={t('new_user')}
        description={t('get_discount')}
        variant="secondary"
      />
      <QuickAccessItem
        icon="eco"
        title={t('organic_coll')}
        description={t('certified_quality')}
        variant="primary"
      />
      <QuickAccessItem
        icon="agriculture"
        title={t('sell_with_us')}
        description={t('farmer_program')}
        variant="secondary"
      />
    </section>
  );
}
