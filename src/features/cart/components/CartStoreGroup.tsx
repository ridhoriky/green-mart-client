'use client';

import { Store } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { CartItem, CartStore } from '@/features/cart/types/cart';
import { CartItemRow } from './CartItemRow';

/**
 * Groups and displays cart items from a single store.
 *
 * @param props - The component props.
 * @returns The CartStoreGroup component.
 */
export function CartStoreGroup(props: {
  store: CartStore;
  items: CartItem[];
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (itemId: string) => void;
  isPendingUpdate: boolean;
  isPendingRemove: boolean;
  updatingItemId?: string;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      {/* Store Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-outline-variant pb-3">
        <Store className="h-5 w-5 text-primary" />
        <span className="font-title-md text-title-md font-bold text-on-surface">
          {props.store.name}
        </span>
        {props.store.is_verified && (
          <span
            className="material-symbols-outlined text-[16px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {props.items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrement={props.onIncrement}
            onDecrement={props.onDecrement}
            onRemove={props.onRemove}
            isPendingUpdate={props.isPendingUpdate}
            isPendingRemove={props.isPendingRemove}
            isItemUpdating={props.updatingItemId === item.id}
          />
        ))}
      </div>
    </Card>
  );
}
