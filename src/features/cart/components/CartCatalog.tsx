'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  useCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from '@/features/cart/hooks/useCart';
import type { CartItem, CartStore } from '@/features/cart/types/cart';
import { CartEmptyState } from './CartEmptyState';
import { CartErrorState } from './CartErrorState';
import { CartHeader } from './CartHeader';
import { CartSkeleton } from './CartSkeleton';
import { CartStoreGroup } from './CartStoreGroup';
import { CartSummary } from './CartSummary';

/**
 * Renders the main catalog layout of the shopping cart page.
 *
 * @returns The CartCatalog component.
 */
export function CartCatalog() {
  const t = useTranslations('CartPage');
  const { data: cartData, isLoading, isError, refetch } = useCartQuery();

  const updateCartItemMutation = useUpdateCartItemMutation();
  const removeCartItemMutation = useRemoveCartItemMutation();
  const clearCartMutation = useClearCartMutation();

  const handleDecrement = (item: CartItem) => {
    if (updateCartItemMutation.isPending || removeCartItemMutation.isPending) {
      return;
    }
    if (item.quantity > 1) {
      updateCartItemMutation.mutate(
        { cartItemId: item.id, quantity: item.quantity - 1 },
        {
          onError: () => {
            toast.error(t('error_update_failed'));
          },
        },
      );
    } else {
      removeCartItemMutation.mutate(item.id, {
        onSuccess: () => {
          toast.success(t('item_removed'));
        },
        onError: () => {
          toast.error(t('error_remove_failed'));
        },
      });
    }
  };

  const handleIncrement = (item: CartItem) => {
    if (updateCartItemMutation.isPending) {
      return;
    }
    updateCartItemMutation.mutate(
      { cartItemId: item.id, quantity: item.quantity + 1 },
      {
        onError: () => {
          toast.error(t('error_update_failed'));
        },
      },
    );
  };

  const handleRemove = (itemId: string) => {
    if (removeCartItemMutation.isPending) {
      return;
    }
    removeCartItemMutation.mutate(itemId, {
      onSuccess: () => {
        toast.success(t('item_removed'));
      },
      onError: () => {
        toast.error(t('error_remove_failed'));
      },
    });
  };

  const handleClear = () => {
    if (clearCartMutation.isPending) {
      return;
    }
    clearCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(t('cart_cleared'));
      },
      onError: () => {
        toast.error(t('error_clear_failed'));
      },
    });
  };

  const handleCheckoutPlaceholder = () => {
    toast.info(t('checkout_placeholder_msg'));
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError) {
    return (
      <CartErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const items = cartData?.items ?? [];
  const groups: Record<string, { store: CartStore; items: CartItem[] }> = {};
  for (const item of items) {
    const storeId = item.store.id;
    groups[storeId] ??= {
      store: item.store,
      items: [],
    };
    groups[storeId].items.push(item);
  }
  const groupedItems = Object.values(groups);

  const hasItems = items.length > 0;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <CartHeader
        totalItems={cartData?.total_items ?? 0}
        hasItems={hasItems}
        onClear={handleClear}
        isClearing={clearCartMutation.isPending}
      />

      {hasItems ? (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart Items Column */}
          <div className="space-y-6 lg:col-span-2">
            {groupedItems.map(({ store, items: storeItems }) => (
              <CartStoreGroup
                key={store.id}
                store={store}
                items={storeItems}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
                isPendingUpdate={updateCartItemMutation.isPending}
                isPendingRemove={removeCartItemMutation.isPending}
                updatingItemId={
                  updateCartItemMutation.isPending
                    ? updateCartItemMutation.variables?.cartItemId
                    : undefined
                }
              />
            ))}
          </div>

          {/* Cart Summary Column */}
          <CartSummary
            totalAmount={cartData?.total_amount ?? 0}
            onCheckout={handleCheckoutPlaceholder}
          />
        </div>
      ) : (
        <CartEmptyState />
      )}
    </div>
  );
}
