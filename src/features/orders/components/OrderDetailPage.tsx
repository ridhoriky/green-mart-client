'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  useOrderDetailQuery,
  useCancelOrderMutation,
  useConfirmOrderMutation,
} from '@/features/orders/hooks/useOrders';
import type { Order, OrderItem, OrderStore } from '@/features/orders/types/order';
import { Link } from '@/libs/I18nNavigation';

/**
 * Renders status badge for orders.
 * @param props - Component props.
 * @returns Styled status badge.
 */
function StatusBadge(props: { status: Order['status'] }) {
  const t = useTranslations('OrdersPage');
  const config = {
    pending:
      'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
    processing:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    shipped:
      'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    delivered:
      'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
    cancelled:
      'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-805',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${config[props.status]}`}
    >
      {t(`status_${props.status}`)}
    </span>
  );
}

/**
 * Renders user order details page.
 * @param props - Component props.
 * @returns Order details view.
 */
export function OrderDetailPage(props: { orderId: string }) {
  const t = useTranslations('OrderDetailPage');
  const { data: order, isLoading, isError, refetch } = useOrderDetailQuery(props.orderId);

  const cancelOrderMutation = useCancelOrderMutation();
  const confirmOrderMutation = useConfirmOrderMutation();

  const handleCancel = () => {
    if (cancelOrderMutation.isPending) {
      return;
    }
    cancelOrderMutation.mutate(props.orderId, {
      onSuccess: () => {
        toast.success(t('cancel_success'));
      },
      onError: () => {
        toast.error(t('cancel_failed'));
      },
    });
  };

  const handleConfirm = () => {
    if (confirmOrderMutation.isPending) {
      return;
    }
    confirmOrderMutation.mutate(props.orderId, {
      onSuccess: () => {
        toast.success(t('confirm_success'));
      },
      onError: () => {
        toast.error(t('confirm_failed'));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <div className="mb-6 h-6 w-32 animate-pulse rounded bg-surface-container-low" />
        <div className="h-96 w-full animate-pulse rounded-2xl bg-surface-container-low" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md text-center md:px-margin-desktop md:py-stack-lg">
        <h1 className="font-headline-md text-headline-md mb-4 text-on-surface">{t('not_found')}</h1>
        <Button onClick={() => void refetch()}>{t('error_loading')}</Button>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum: number, item: OrderItem) => sum + item.subtotal, 0);
  const { store }: { store: OrderStore } = order;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Back Button */}
      <Link
        href="/account/orders"
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back_to_orders')}
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Header / Info Card */}
          <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-6">
              <div>
                <h1 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">
                  {t('title')}
                </h1>
                <p className="text-xs font-semibold text-on-surface-variant">
                  {t('order_number')}: <span className="text-on-surface">{order.order_number}</span>
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="mb-1 block text-xs font-semibold text-on-surface-variant uppercase">
                  {t('order_date')}
                </span>
                <span className="text-body-md font-bold text-on-surface">
                  {new Date(order.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div>
                <span className="mb-1 block text-xs font-semibold text-on-surface-variant uppercase">
                  {t('store')}
                </span>
                <span className="text-body-md font-bold text-primary">{store.store_name}</span>
              </div>
            </div>

            {/* Actions Block */}
            {(order.status === 'pending' || order.status === 'shipped') && (
              <div className="mt-8 flex justify-end border-t border-outline-variant pt-6">
                {order.status === 'pending' && (
                  <Button
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={cancelOrderMutation.isPending}
                  >
                    {cancelOrderMutation.isPending ? t('cancelling') : t('cancel_button')}
                  </Button>
                )}
                {order.status === 'shipped' && (
                  <Button
                    onClick={handleConfirm}
                    disabled={confirmOrderMutation.isPending}
                    className="font-bold shadow-md transition-shadow hover:shadow-lg"
                  >
                    {confirmOrderMutation.isPending ? t('confirming') : t('confirm_button')}
                  </Button>
                )}
              </div>
            )}
          </Card>

          {/* Items Card */}
          <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <h2 className="mb-4 font-title-md text-title-md font-bold text-on-surface">
              {t('items_list')}
            </h2>
            <div className="divide-y divide-outline-variant">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-body-md truncate font-bold text-on-surface">
                      {item.product_name}
                    </h3>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {item.quantity} x Rp {Math.round(item.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right font-bold text-on-surface">
                    Rp {Math.round(item.subtotal).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Summary & Details */}
        <div className="space-y-6">
          {/* Payment Details Card */}
          <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <h2 className="mb-5 font-title-md text-title-md font-bold text-on-surface">
              {t('order_info')}
            </h2>

            <div className="mb-4 space-y-4 border-b border-outline-variant pb-4">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{t('subtotal')}</span>
                <span className="text-on-surface">
                  Rp {Math.round(subtotal).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{t('shipping')}</span>
                <span className="text-on-surface">
                  {order.shipping_cost === undefined || order.shipping_cost === 0
                    ? t('free')
                    : `Rp ${Math.round(order.shipping_cost).toLocaleString('id-ID')}`}
                </span>
              </div>
            </div>

            <div className="mb-6 flex justify-between text-title-md font-bold text-on-surface">
              <span>{t('total')}</span>
              <span className="text-primary">
                Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
              </span>
            </div>

            <div className="space-y-4 border-t border-outline-variant pt-4">
              <div>
                <span className="mb-1 block text-xs font-semibold text-on-surface-variant uppercase">
                  {t('payment_info')}
                </span>
                <span className="text-xs font-bold text-on-surface">
                  {order.payment_method === 'bank_transfer' ||
                  order.payment_method === 'e_wallet' ||
                  order.payment_method === 'credit_card'
                    ? t(order.payment_method)
                    : order.payment_method}
                </span>
              </div>
              <div>
                <span className="mb-1 block text-xs font-semibold text-on-surface-variant uppercase">
                  {t('shipping_info')}
                </span>
                <span className="text-xs font-medium text-on-surface-variant">
                  {order.shipping_address ? order.shipping_address.join(', ') : ''}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
