'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  useSellerOrderDetailQuery,
  useUpdateOrderStatusMutation,
} from '@/features/seller/hooks/useSellerOrders';
import type { SellerOrderStatus } from '@/features/seller/types/seller-order';
import { cn } from '@/lib/utils';
import { Link } from '@/libs/I18nNavigation';
import { getImageUrl } from '@/utils/Helpers';

/**
 * Status badge for seller order detail view.
 * @param props - Component props.
 * @returns Styled badge element.
 */
function StatusBadge(props: { status: SellerOrderStatus }) {
  const t = useTranslations('SellerOrdersPage');
  const config = {
    pending:
      'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
    processing:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    shipped:
      'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    delivered:
      'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
    cancelled:
      'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase',
        config[props.status],
      )}
    >
      {t(`status_${props.status}`)}
    </span>
  );
}

/**
 * Seller order detail page component.
 * @param props - Component props containing orderId.
 * @returns React node.
 */
export function SellerOrderDetailPage(props: { orderId: string }) {
  const t = useTranslations('SellerOrderDetailPage');
  const { data: order, isLoading, isError, refetch } = useSellerOrderDetailQuery(props.orderId);
  const updateStatusMutation = useUpdateOrderStatusMutation(props.orderId);

  const handleUpdateStatus = (newStatus: SellerOrderStatus) => {
    if (updateStatusMutation.isPending) {
      return;
    }

    updateStatusMutation.mutate(
      { status: newStatus },
      {
        onSuccess: () => {
          toast.success(t('status_updated'));
        },
        onError: () => {
          toast.error(t('status_update_failed'));
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="h-96 w-full animate-pulse rounded-lg border bg-muted/30" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-bold">{t('not_found')}</h2>
        <Button onClick={() => void refetch()}>{t('error_loading')}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/seller/orders"
        className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back_to_orders')}
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="font-mono text-sm text-muted-foreground">
            {t('order_number')}:{' '}
            <span className="font-semibold text-foreground">{order.order_number}</span>
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items Card */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-bold">{t('items_list')}</h3>
            <div className="divide-y">
              {order.items?.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={getImageUrl(item.product_image, '/assets/images/placeholder.png')}
                      alt={item.product_name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-bold">{item.product_name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.quantity} x Rp {Math.round(item.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="font-bold text-foreground">
                    Rp {Math.round(item.subtotal).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal / Total */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-base font-bold">
                <span>{t('total_amount')}</span>
                <span className="text-primary">
                  Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons for Seller */}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-bold">{t('action_update_status')}</h3>
              <div className="flex flex-wrap gap-3">
                {(order.status === 'pending' || order.status === 'paid') && (
                  <Button
                    onClick={() => {
                      handleUpdateStatus('processing');
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    {t('mark_as_processing')}
                  </Button>
                )}

                {order.status === 'processing' && (
                  <Button
                    onClick={() => {
                      handleUpdateStatus('shipped');
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    {t('mark_as_shipped')}
                  </Button>
                )}

                {order.status === 'shipped' && (
                  <Button
                    onClick={() => {
                      handleUpdateStatus('delivered');
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    {t('mark_as_delivered')}
                  </Button>
                )}

                <Button
                  variant="destructive"
                  onClick={() => {
                    handleUpdateStatus('cancelled');
                  }}
                  disabled={updateStatusMutation.isPending}
                >
                  {t('cancel_order')}
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-bold">{t('buyer_info')}</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase">
                  {t('buyer_name')}
                </span>
                <span className="font-bold text-foreground">{order.buyer_name}</span>
              </div>

              {order.buyer_address && (
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">
                    {t('shipping_address')}
                  </span>
                  <span className="text-muted-foreground">{order.buyer_address}</span>
                </div>
              )}

              {order.notes && (
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">
                    {t('notes')}
                  </span>
                  <span className="text-muted-foreground">{order.notes}</span>
                </div>
              )}

              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase">
                  {t('order_date')}
                </span>
                <span className="text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
