import { Search, ArrowRight, LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { Link } from '@/libs/I18nNavigation';
import { getImageUrl } from '@/utils/Helpers';

/**
 * Render search results in a grid layout.
 *
 * @param props - The search results props.
 * @returns The search results element.
 */
export function SearchResults(props: {
  matched: { node: CategoryTreeNode; path: string }[];
  searchQuery: string;
}) {
  const t = useTranslations('CategoriesPage');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <h2 className="flex items-center gap-2 font-title-md text-title-md font-bold text-on-surface">
          <Search className="h-5 w-5 text-primary" />
          <span>{t('search_results_for', { query: props.searchQuery })}</span>
        </h2>
        <span className="text-[13px] font-medium text-outline">
          {props.matched.length} {t('category_count', { count: props.matched.length })}
        </span>
      </div>

      {props.matched.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {props.matched.map(({ node, path }) => (
            <Card
              key={node.id}
              className="product-card-hover flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-44 w-full bg-surface-container">
                <Image
                  src={getImageUrl(
                    node.image_url,
                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
                  )}
                  alt={node.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="default"
                    className="border-none bg-primary/95 text-[10px] tracking-wider uppercase"
                  >
                    {node.product_count} {t('product_count', { count: node.product_count })}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-[11px] font-bold tracking-wider text-primary uppercase">
                  {path.includes('›')
                    ? path.slice(0, path.lastIndexOf(' › '))
                    : t('category_label')}
                </span>
                <h3 className="font-title-sm mb-2 text-body-lg font-bold text-on-surface">
                  {node.name}
                </h3>
                <p className="mb-4 line-clamp-2 flex-1 font-body-sm text-[13px] text-on-surface-variant">
                  {node.description ?? t('default_category_description')}
                </p>
                <Link
                  href={`/products?category=${encodeURIComponent(node.name)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-[13px] font-bold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  <span>{t('view_products')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <LayoutGrid className="mx-auto mb-3 h-12 w-12 text-outline" />
          <p className="mb-1 text-[15px] font-semibold text-on-surface">{t('empty_state')}</p>
          <p className="text-[13px] text-on-surface-variant">{t('search_help')}</p>
        </div>
      )}
    </div>
  );
}
