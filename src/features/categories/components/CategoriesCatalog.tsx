'use client';

import { Search, AlertTriangle, ArrowRight, LayoutGrid, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCategoriesQuery } from '@/features/categories/hooks/useCategories';
import { Link } from '@/libs/I18nNavigation';
import { getFlattenedCategories } from '../utils/helpers';
import { CategoriesSkeleton } from './CategoriesSkeleton';
import { SearchResults } from './SearchResults';
import { SidebarCategoryItem } from './SidebarCategoryItem';
import { SubcategoryCard } from './SubcategoryCard';

/**
 * Render the categories catalog page with sidebar navigation and category sections.
 *
 * @returns The categories catalog element.
 */
export function CategoriesCatalog() {
  const t = useTranslations('CategoriesPage');
  const { data: categories, isLoading, isError, refetch } = useCategoriesQuery();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeParentId, setActiveParentId] = React.useState<string | null>(null);

  // Refs for scrolling to sections
  const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Loading skeleton
  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  // Error state
  if (isError || !categories) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <Card className="mx-auto max-w-lg rounded-2xl border-error bg-error/5 p-8 text-center text-error">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="h-6 w-6 text-error" />
          </div>
          <h3 className="font-title-lg mb-2 font-bold">{t('error_message')}</h3>
          <p className="mb-6 text-body-sm text-on-surface-variant">{t('error_description')}</p>
          <Button onClick={() => void refetch()} variant="primary" className="rounded-full px-6">
            {t('retry_button')}
          </Button>
        </Card>
      </div>
    );
  }

  // Search functionality
  const flattened = getFlattenedCategories(categories);
  const matched = searchQuery.trim()
    ? flattened.filter(
        ({ node }) =>
          node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const handleSidebarClick = (parentId: string) => {
    setActiveParentId(parentId);
    setSearchQuery('');
    const section = sectionRefs.current[parentId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-container-max px-margin-mobile pt-8 pb-stack-lg md:px-margin-desktop">
      {/* Search Bar (mobile + desktop) */}
      <div className="relative mb-8 max-w-full">
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="h-11 w-full rounded-md border border-outline-variant bg-surface-container-lowest pr-12 pl-11 shadow-xs focus-visible:ring-primary"
        />
        <Search className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-outline" />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
            }}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-outline transition-colors hover:bg-surface-container-low hover:text-on-surface"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Mode */}
      {searchQuery.trim() ? (
        <SearchResults matched={matched} searchQuery={searchQuery} />
      ) : (
        /* Main Grid Layout */
        <div className="grid grid-cols-12 gap-gutter">
          {/* Sidebar Navigation */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-3">
            <div className="sticky top-28 space-y-stack-lg">
              {/* Parent Categories List */}
              <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-stack-md shadow-sm">
                <h3 className="mb-4 font-label-bold text-label-bold tracking-widest text-outline uppercase">
                  {t('main_categories')}
                </h3>
                <ul className="space-y-1">
                  {categories.map((parent) => (
                    <SidebarCategoryItem
                      key={parent.id}
                      category={parent}
                      isActive={activeParentId === parent.id}
                      onClick={() => {
                        handleSidebarClick(parent.id);
                      }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content: Category Sections */}
          <div className="col-span-12 space-y-stack-lg md:col-span-9 lg:col-span-9">
            {categories.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low/20 py-16 text-center">
                <LayoutGrid className="mx-auto mb-3 h-12 w-12 animate-pulse text-outline" />
                <h3 className="mb-1 text-body-lg font-bold text-on-surface">
                  {t('empty_categories')}
                </h3>
                <p className="text-[13px] text-on-surface-variant">
                  {t('empty_categories_description')}
                </p>
              </div>
            ) : (
              categories.map((parent) => (
                <div
                  key={parent.id}
                  ref={(el) => {
                    sectionRefs.current[parent.id] = el;
                  }}
                  className="scroll-mt-28"
                >
                  {/* Section Header */}
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-headline-lg text-headline-lg text-primary">
                      {parent.name}
                    </h2>
                    <div className="h-px grow bg-outline-variant/30" />
                    <span className="font-body-sm text-body-sm text-outline">
                      {t('items_found', { count: parent.product_count })}
                    </span>
                  </div>

                  {/* Subcategories Grid */}
                  {parent.children && parent.children.length > 0 ? (
                    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                      {parent.children.map((child) => (
                        <SubcategoryCard key={child.id} category={child} />
                      ))}
                    </div>
                  ) : (
                    /* Parent without children — show as single card */
                    <Link
                      href={`/products?category=${encodeURIComponent(parent.name)}`}
                      className="group block"
                    >
                      <div className="relative h-62.5 overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm">
                        <Image
                          src={
                            parent.image_url ??
                            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800'
                          }
                          alt={parent.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 80vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-r from-primary/70 to-transparent p-stack-lg">
                          <Badge
                            variant="secondary"
                            className="mb-4 self-start border-none bg-white/20 px-3 py-1 font-label-bold text-label-bold text-white backdrop-blur-md"
                          >
                            {t('product_count', { count: parent.product_count })}
                          </Badge>
                          <h3 className="mb-2 font-display-lg text-display-lg text-white">
                            {parent.name}
                          </h3>
                          <p className="mb-6 max-w-md text-white/90">
                            {parent.description ?? t('default_category_description')}
                          </p>
                          <Button
                            className="w-fit border-white/30 bg-white/20 font-label-bold text-white backdrop-blur-md hover:bg-white/30"
                            variant="outline"
                          >
                            {t('view_all_products')} <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
