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
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { Link } from '@/libs/I18nNavigation';

/**
 * Flatten category tree for search query matching.
 *
 * @param nodes - The category tree nodes to flatten.
 * @param parentName - The name of the parent category.
 * @returns The array of flattened category nodes with their paths.
 */
const getFlattenedCategories = (
  nodes: CategoryTreeNode[],
  parentName?: string,
): { node: CategoryTreeNode; path: string }[] => {
  const list: { node: CategoryTreeNode; path: string }[] = [];
  for (const node of nodes) {
    const currentPath = parentName ? `${parentName} › ${node.name}` : node.name;
    list.push({ node, path: currentPath });
    if (node.children && node.children.length > 0) {
      list.push(...getFlattenedCategories(node.children, node.name));
    }
  }
  return list;
};

/**
 * Render a single subcategory card with image, hover overlay, and metadata.
 *
 * @param props - The subcategory card props.
 * @returns The subcategory card element.
 */
function SubcategoryCard(props: { category: CategoryTreeNode }) {
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

/**
 * Sidebar parent category item with active state.
 *
 * @param props - The sidebar category item props.
 * @returns The sidebar category item element.
 */
function SidebarCategoryItem(props: {
  category: CategoryTreeNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={props.onClick}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
          props.isActive ? 'sidebar-item-active' : 'text-secondary hover:bg-surface-container'
        }`}
      >
        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md">
          <Image
            src={
              props.category.image_url ??
              'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100'
            }
            alt={props.category.name}
            fill
            sizes="24px"
            className="object-cover"
          />
        </div>
        <span className="font-body-sm text-body-sm">{props.category.name}</span>
      </button>
    </li>
  );
}

/**
 * Render search results in a grid layout.
 *
 * @param props - The search results props.
 * @returns The search results element.
 */
function SearchResults(props: {
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
                  src={
                    node.image_url ??
                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500'
                  }
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

/**
 * Render loading skeleton matching the new layout.
 *
 * @returns The categories skeleton element.
 */
function CategoriesSkeleton() {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-surface-container-high" />
        <div className="mb-2 h-12 w-72 animate-pulse rounded bg-surface-container-high" />
        <div className="h-5 w-96 animate-pulse rounded bg-surface-container-high" />
      </div>
      {/* Search skeleton */}
      <div className="mb-8 h-11 max-w-md animate-pulse rounded-full bg-surface-container-high" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Sidebar skeleton */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="space-y-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-stack-md">
            <div className="mb-4 h-3 w-24 animate-pulse rounded bg-surface-container-high" />
            {Array.from({ length: 5 }).map((_sidebarItem, i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-surface-container-high" />
            ))}
          </div>
        </aside>
        {/* Content skeleton */}
        <div className="col-span-12 space-y-10 md:col-span-9 lg:col-span-10">
          {Array.from({ length: 2 }).map((_section, si) => (
            <div key={si}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-8 w-48 animate-pulse rounded bg-surface-container-high" />
                <div className="h-px grow bg-outline-variant/30" />
                <div className="h-4 w-24 animate-pulse rounded bg-surface-container-high" />
              </div>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_card, ci) => (
                  <div key={ci}>
                    <div className="aspect-square animate-pulse rounded-xl bg-surface-container-high" />
                    <div className="mt-4 h-5 w-32 animate-pulse rounded bg-surface-container-high" />
                    <div className="mt-2 h-4 w-48 animate-pulse rounded bg-surface-container-high" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
                      <div className="relative h-[250px] overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm">
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
