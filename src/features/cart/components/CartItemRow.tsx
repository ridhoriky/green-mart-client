'use client';

import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/features/cart/types/cart';
import { Link } from '@/libs/I18nNavigation';

/**
 * Renders a single cart item row with details, quantity controls, and actions.
 *
 * @param props - The component props.
 * @returns The CartItemRow component.
 */
export function CartItemRow(props: {
  item: CartItem;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (itemId: string) => void;
  isPendingUpdate: boolean;
  isPendingRemove: boolean;
  isItemUpdating: boolean;
}) {
  const t = useTranslations('CartPage');

  const imageUrl =
    props.item.product.primary_image ??
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60';

  return (
    <div className="flex flex-col items-start gap-4 py-3 last:pb-0 sm:flex-row sm:items-center">
      {/* Product Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
        <Image
          src={imageUrl}
          alt={props.item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${props.item.product.slug}`}
          className="font-title-sm text-title-sm line-clamp-1 font-bold text-on-surface transition-colors hover:text-primary"
        >
          {props.item.product.name}
        </Link>
        <p className="mt-1 font-body-sm text-[12px] text-on-surface-variant">
          Rp {Math.round(props.item.product.price).toLocaleString('id-ID')}
        </p>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
        <div className="flex items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container-low p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              props.onDecrement(props.item);
            }}
            disabled={props.isPendingRemove}
            className="h-7 w-7 rounded-full text-on-surface hover:bg-surface-container-high"
          >
            {props.item.quantity === 1 ? (
              <Trash2 className="h-3.5 w-3.5 text-error" />
            ) : (
              <Minus className="h-3.5 w-3.5" />
            )}
          </Button>
          <span className="w-8 text-center text-[13px] font-bold text-on-surface">
            {props.item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              props.onIncrement(props.item);
            }}
            disabled={props.isPendingRemove}
            className="h-7 w-7 rounded-full text-on-surface hover:bg-surface-container-high"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="min-w-30 text-right">
          <div className="flex items-center justify-end gap-1.5">
            {props.isItemUpdating && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary/70" />
            )}
            <p className="font-title-sm text-title-sm font-bold text-primary">
              Rp {Math.round(props.item.subtotal).toLocaleString('id-ID')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              props.onRemove(props.item.id);
            }}
            disabled={props.isPendingRemove}
            className="mt-1 text-[11px] font-medium text-outline transition-colors hover:text-error"
          >
            {t('remove_item')}
          </button>
        </div>
      </div>
    </div>
  );
}
