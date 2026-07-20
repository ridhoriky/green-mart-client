'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
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

  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      for (const timeout of Object.values(currentTimeouts)) {
        clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    if (!cartData) {
      return;
    }
    setLocalQuantities((prev) => {
      const next: Record<string, number> = {};
      let hasChanges = false;

      for (const [key, val] of Object.entries(prev)) {
        const item = cartData.items.find((i) => i.id === key);
        if (!item || item.quantity === val) {
          hasChanges = true;
        } else {
          next[key] = val;
        }
      }

      return hasChanges ? next : prev;
    });
  }, [cartData]);

  const handleDecrement = (item: CartItem) => {
    if (removeCartItemMutation.isPending) {
      return;
    }

    const currentQty = localQuantities[item.id] ?? item.quantity;

    if (currentQty > 1) {
      const newQty = currentQty - 1;

      // Update UI instantly
      setLocalQuantities((prev) => ({ ...prev, [item.id]: newQty }));

      // Debounce the API call
      if (timeoutsRef.current[item.id]) {
        clearTimeout(timeoutsRef.current[item.id]);
      }

      timeoutsRef.current[item.id] = setTimeout(() => {
        updateCartItemMutation.mutate(
          { cartItemId: item.id, quantity: newQty },
          {
            onError: () => {
              setLocalQuantities((prev) => {
                const { [item.id]: _, ...rest } = prev;
                return rest;
              });
              toast.error(t('error_update_failed'));
            },
          },
        );
      }, 500);
    } else {
      // Destructive remove: do it instantly
      if (timeoutsRef.current[item.id]) {
        clearTimeout(timeoutsRef.current[item.id]);
      }
      removeCartItemMutation.mutate(item.id, {
        onSuccess: () => {
          toast.success(t('item_removed'));
          setLocalQuantities((prev) => {
            const { [item.id]: _, ...rest } = prev;
            return rest;
          });
        },
        onError: () => {
          toast.error(t('error_remove_failed'));
        },
      });
    }
  };

  const handleIncrement = (item: CartItem) => {
    if (removeCartItemMutation.isPending) {
      return;
    }

    const currentQty = localQuantities[item.id] ?? item.quantity;
    const newQty = currentQty + 1;

    setLocalQuantities((prev) => ({ ...prev, [item.id]: newQty }));

    if (timeoutsRef.current[item.id]) {
      clearTimeout(timeoutsRef.current[item.id]);
    }

    timeoutsRef.current[item.id] = setTimeout(() => {
      updateCartItemMutation.mutate(
        { cartItemId: item.id, quantity: newQty },
        {
          onError: () => {
            setLocalQuantities((prev) => {
              const { [item.id]: _, ...rest } = prev;
              return rest;
            });
            toast.error(t('error_update_failed'));
          },
        },
      );
    }, 500);
  };

  const handleRemove = (itemId: string) => {
    if (removeCartItemMutation.isPending) {
      return;
    }
    if (timeoutsRef.current[itemId]) {
      clearTimeout(timeoutsRef.current[itemId]);
    }
    removeCartItemMutation.mutate(itemId, {
      onSuccess: () => {
        toast.success(t('item_removed'));
        setLocalQuantities((prev) => {
          const { [itemId]: _, ...rest } = prev;
          return rest;
        });
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
    for (const timeout of Object.values(timeoutsRef.current)) {
      clearTimeout(timeout);
    }
    clearCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(t('cart_cleared'));
        setLocalQuantities({});
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
  const optimisticItems = items.map((item) => {
    const localQty = localQuantities[item.id];
    const { quantity: qty, subtotal } = item;
    const { price } = item.product;

    if (localQty !== undefined) {
      const unitPrice = qty > 0 ? subtotal / qty : price;
      return {
        ...item,
        quantity: localQty,
        subtotal: localQty * unitPrice,
      };
    }
    return {
      ...item,
      quantity: qty,
      subtotal,
    };
  });

  const totalItems = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = optimisticItems.reduce((sum, item) => sum + item.subtotal, 0);

  const groups: Record<string, { store: CartStore; items: CartItem[] }> = {};
  for (const item of optimisticItems) {
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
        totalItems={totalItems}
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
          <CartSummary totalAmount={totalAmount} onCheckout={handleCheckoutPlaceholder} />
        </div>
      ) : (
        <CartEmptyState />
      )}
    </div>
  );
}
