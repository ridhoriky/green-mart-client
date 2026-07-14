import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { Link } from '@/libs/I18nNavigation';

/**
 * Render a single subcategory card with image, hover overlay, and metadata.
 *
 * @param props - The subcategory card props.
 * @returns The subcategory card element.
 */
export function SubcategoryCard(props: { category: CategoryTreeNode }) {
  const t = useTranslations('CategoriesPage');

  return (
    <Link
      href={`/products?category=${encodeURIComponent(props.category.name)}`}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container shadow-sm">
        <Image
          src={
            props.category.image_url ??
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500'
          }
          alt={props.category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="w-full transform rounded-lg bg-primary py-3 text-center font-title-md text-white transition-transform group-hover:translate-y-0">
            {t('explore_button')}
          </span>
        </div>
        {/* Product count badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="border-none bg-secondary-container/95 px-3 py-1 font-label-bold text-label-bold text-on-secondary-container"
          >
            {t('product_count', { count: props.category.product_count })}
          </Badge>
        </div>
      </div>
      <h3 className="mt-4 mb-1 font-title-md text-title-md text-on-background">
        {props.category.name}
      </h3>
      <p className="font-body-sm text-body-sm text-secondary">
        {props.category.description ?? t('default_subcategory_description')}
      </p>
    </Link>
  );
}
