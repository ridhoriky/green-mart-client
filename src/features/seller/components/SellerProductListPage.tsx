'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';
import { useSellerProductsQuery } from '../hooks/useSellerProducts';
import { SellerProductTable } from './SellerProductTable';

export function SellerProductListPage() {
  const t = useTranslations('SellerProducts');
  const { data, isLoading, error } = useSellerProductsQuery();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Link
          href="/seller/products/new"
          className={`${buttonVariants({ variant: 'default' })} gap-2`}
        >
          <Plus className="h-4 w-4" />
          {t('add_product')}
        </Link>
      </div>

      {isLoading && (
        <div className="flex min-h-75 items-center justify-center rounded-md border">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      {!isLoading && error && (
        <div className="rounded-md border border-destructive p-4 text-destructive">
          {t('error_loading')}
        </div>
      )}
      {!isLoading && !error && <SellerProductTable products={data?.data ?? []} />}
    </div>
  );
}
