'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOrdersQuery } from '@/features/orders/hooks/useOrders';
import type { Order } from '@/features/orders/types/order';
import { PaginationSection } from '@/features/products/components/PaginationSection';
import { cn } from '@/lib/utils';
import { Link, usePathname, useRouter } from '@/libs/I18nNavigation';

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
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
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
 * Type guard to check if a status string is a valid Order status.
 * @param s - The status string.
 * @returns True if valid order status.
 */
function isValidStatus(s: string): s is Order['status'] {
  return ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(s);
}

/**
 * Renders user orders list page.
 * @returns Orders list view.
 */
export function OrdersPage() {
  const t = useTranslations('OrdersPage');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get('page') ?? '1');
  const statusParam = searchParams.get('status') ?? 'all';

  const { data, isLoading } = useOrdersQuery({
    page,
    limit: 10,
    status: isValidStatus(statusParam) ? statusParam : undefined,
  });

  const updateParams = (
    newParams: Record<string, string | number | boolean | undefined | null>,
  ) => {
    const current = new URLSearchParams([...searchParams.entries()]);

    for (const [key, value] of Object.entries(newParams)) {
      if (value === undefined || value === null || value === '' || value === 'all') {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    }

    if (!('page' in newParams)) {
      current.delete('page');
    }

    router.push(`${pathname}?${current.toString()}`);
  };

  const statuses: (Order['status'] | 'all')[] = [
    'all',
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  const orders = data?.data ?? [];
  const totalPages = data?.meta.total_pages ?? 1;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <h1 className="font-headline-md text-headline-md mb-6 font-bold text-on-surface">
          {t('title')}
        </h1>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 w-full animate-pulse rounded-2xl bg-surface-container-low"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <h1 className="font-headline-md text-headline-md mb-6 font-bold text-on-surface">
        {t('title')}
      </h1>

      {/* Status Tabs */}
      <div className="mb-6 flex scrollbar-none gap-2 overflow-x-auto pb-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => {
              updateParams({ status: s, page: 1 });
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
              statusParam === s
                ? 'bg-primary text-on-primary shadow-sm'
                : 'hover:bg-surface-container-medium bg-surface-container-low text-on-surface'
            }`}
          >
            {t(`status_${s}`)}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">
            {t('empty_orders')}
          </h2>
          <p className="text-body-md mb-6 max-w-sm text-on-surface-variant">
            {t('empty_orders_desc')}
          </p>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: 'primary', size: 'default' }))}
          >
            {t('start_shopping')}
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {orders.map((order) => {
              const [firstItem] = order.items;
              const remainingCount = order.items.length - 1;

              return (
                <Card
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-low px-6 py-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-on-surface-variant">
                      <div>
                        <span className="mr-1.5 font-medium text-on-surface-variant/80">
                          {t('order_number')}:
                        </span>
                        <span className="font-bold text-on-surface">{order.order_number}</span>
                      </div>
                      <div>
                        <span className="mr-1.5 font-medium text-on-surface-variant/80">
                          {t('order_date')}:
                        </span>
                        <span className="font-bold text-on-surface">
                          {new Date(order.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="font-bold text-primary">{order.store.name}</div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {firstItem && (
                      <div className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                          <Image
                            src={firstItem.product_image}
                            alt={firstItem.product_name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-title-md font-bold text-on-surface">
                            {firstItem.product_name}
                          </h3>
                          <p className="mt-1 text-xs text-on-surface-variant">
                            {firstItem.quantity} x Rp{' '}
                            {Math.round(firstItem.price).toLocaleString('id-ID')}
                          </p>
                          {remainingCount > 0 && (
                            <p className="mt-2 text-xs font-semibold text-primary">
                              {t('remaining_items', { count: remainingCount })}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="mb-1 block text-xs font-semibold text-on-surface-variant uppercase">
                            {t('total_price')}
                          </span>
                          <span className="text-title-lg block font-bold text-primary">
                            Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="flex justify-end border-t border-outline-variant bg-surface-container-lowest px-6 py-4">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className={cn(buttonVariants({ variant: 'outline', size: 'small' }))}
                    >
                      {t('detail_button')}
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          <PaginationSection page={page} totalPages={totalPages} updateParams={updateParams} />
        </>
      )}
    </div>
  );
}
