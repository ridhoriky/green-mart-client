'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

/**
 * Renders the header section of the cart page, including the title, item count,
 * and an option to clear all items from the cart.
 *
 * @param props - The component props.
 * @returns The CartHeader component.
 */
export function CartHeader(props: {
  totalItems: number;
  hasItems: boolean;
  onClear: () => void;
  isClearing: boolean;
}) {
  const t = useTranslations('CartPage');

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-outline-variant pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
          {t('title')}
        </h1>
        <p className="mt-1 font-body-sm text-[13px] text-on-surface-variant">
          {props.hasItems ? t('items_found', { count: props.totalItems }) : t('subtitle')}
        </p>
      </div>
      {props.hasItems && (
        <Button
          variant="outline"
          size="small"
          onClick={props.onClear}
          disabled={props.isClearing}
          className="gap-2 self-start rounded-full border-outline-variant text-on-surface-variant hover:bg-error/5 hover:text-error sm:self-auto"
        >
          {props.isClearing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {t('clear_cart')}
        </Button>
      )}
    </div>
  );
}
