import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

type CategoryMenuItem = {
  key:
    | 'fruits'
    | 'vegetables'
    | 'rice_grains'
    | 'herbs'
    | 'organic'
    | 'fertilizer'
    | 'tools'
    | 'farmers'
    | 'seeds'
    | 'meat'
    | 'dairy'
    | 'spices'
    | 'poultry'
    | 'gardening';
  icon: string;
  query: string;
};

const CATEGORY_ITEMS: CategoryMenuItem[] = [
  { key: 'fruits', icon: 'nutrition', query: 'fruits' },
  { key: 'vegetables', icon: 'spa', query: 'vegetables' },
  { key: 'rice_grains', icon: 'grass', query: 'grains' },
  { key: 'herbs', icon: 'psychology_alt', query: 'herbs' },
  { key: 'organic', icon: 'verified', query: 'organic' },
  { key: 'fertilizer', icon: 'compost', query: 'fertilizer' },
  { key: 'tools', icon: 'hand_meal', query: 'tools' },
  { key: 'farmers', icon: 'group', query: 'farmers' },
  { key: 'seeds', icon: 'yard', query: 'seeds' },
  { key: 'meat', icon: 'set_meal', query: 'meat' },
  { key: 'dairy', icon: 'egg', query: 'dairy' },
  { key: 'spices', icon: 'local_fire_department', query: 'spices' },
  { key: 'poultry', icon: 'egg_alt', query: 'poultry' },
  { key: 'gardening', icon: 'agriculture', query: 'gardening' },
];

export function CategoryMenu() {
  const t = useTranslations('Index.CategoryMenu');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="hide-scrollbar flex gap-8 overflow-x-auto py-4">
        {CATEGORY_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={`/products?category=${item.query}`}
            className="group flex shrink-0 cursor-pointer flex-col items-center gap-3"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container transition-all group-hover:bg-primary/20">
              <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
            </div>
            <span className="font-label-bold text-body-sm">{t(item.key)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
