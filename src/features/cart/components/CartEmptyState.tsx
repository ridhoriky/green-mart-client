'use client';

import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';

/**
 * Renders the empty state screen when the cart is empty.
 *
 * @returns The CartEmptyState component.
 */
export function CartEmptyState() {
  const t = useTranslations('CartPage');

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
        <ShoppingBag className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-title-lg mb-2 text-body-lg font-bold text-on-surface">
        {t('empty_title')}
      </h3>
      <p className="mb-8 text-[13px] text-on-surface-variant">{t('empty_desc')}</p>
      <Link href="/products">
        <Button variant="default" className="rounded-md px-8 py-5 font-bold">
          {t('start_shopping')}
        </Button>
      </Link>
    </div>
  );
}
