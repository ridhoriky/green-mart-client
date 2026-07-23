'use client';

import { useTranslations } from 'next-intl';
import { useSellerProductDetailQuery } from '../hooks/useSellerProducts';
import { SellerProductForm } from './SellerProductForm';

export function SellerProductEditClient({ id }: { id: string }) {
  const t = useTranslations('SellerProducts');
  const { data: product, isLoading, error } = useSellerProductDetailQuery(id);

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="rounded-md border border-destructive p-4 text-destructive">
        {t('error_loading')}
      </div>
    );
  }

  return <SellerProductForm initialData={product} />;
}
