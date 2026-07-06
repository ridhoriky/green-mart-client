import { useTranslations } from 'next-intl';
import Image from 'next/image';

type CategoryItemProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

function CategoryItem(props: CategoryItemProps) {
  return (
    <div className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl">
      <Image
        src={props.src}
        alt={props.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 left-6 z-20 text-white">
        <h3 className="mb-1 font-headline-lg text-headline-lg-mobile">{props.title}</h3>
        <p className="text-body-sm opacity-90">{props.description}</p>
      </div>
    </div>
  );
}

export function FeaturedCategories() {
  const t = useTranslations('Index.FeaturedCategories');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <h2 className="mb-8 font-headline-lg text-headline-lg">{t('title')}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CategoryItem
          src="/assets/images/categories-01.jpg"
          alt="Vegetables"
          title={t('cat_vegetables')}
          description={t('desc_vegetables')}
        />
        <CategoryItem
          src="/assets/images/categories-02.jpg"
          alt="Fresh Fruits"
          title={t('cat_fruits')}
          description={t('desc_fruits')}
        />
        <CategoryItem
          src="/assets/images/categories-03.jpg"
          alt="Grains & Rice"
          title={t('cat_grains')}
          description={t('desc_grains')}
        />
      </div>
    </section>
  );
}
