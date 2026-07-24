'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationSection } from '@/features/products/components/PaginationSection';
import { useSellerOrdersQuery } from '@/features/seller/hooks/useSellerOrders';
import type { SellerOrder, SellerOrderStatus } from '@/features/seller/types/seller-order';
import { cn } from '@/lib/utils';
import { Link, usePathname, useRouter } from '@/libs/I18nNavigation';

/**
 * Status badge for seller orders.
 * @param props - Component props.
 * @returns Styled status badge.
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
 * Type guard for seller order status.
 * @param s - Input string.
 * @returns True if valid seller order status.
 */
function isValidStatus(s: string): s is SellerOrderStatus {
  return ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'paid'].includes(s);
}

/**
 * Seller orders list page component.
 * @returns React node.
 */
export function SellerOrderListPage() {
  const t = useTranslations('SellerOrdersPage');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get('page') ?? '1');
  const statusParam = searchParams.get('status') ?? 'all';

  const { data, isLoading, error } = useSellerOrdersQuery({
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

  const statuses: (SellerOrderStatus | 'all')[] = [
    'all',
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  const orders = data?.data ?? [];
  const totalPages = data?.meta?.total_pages ?? 1;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="flex min-h-75 items-center justify-center rounded-md border">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="rounded-md border border-destructive p-4 text-destructive">
          {t('error_loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex scrollbar-none gap-2 overflow-x-auto pb-2">
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
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <h3 className="text-lg font-bold text-on-surface">{t('empty_orders')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('empty_orders_desc')}</p>
        </Card>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('column_order_number')}</TableHead>
                  <TableHead>{t('column_buyer')}</TableHead>
                  <TableHead>{t('column_items_count')}</TableHead>
                  <TableHead>{t('column_total')}</TableHead>
                  <TableHead>{t('column_status')}</TableHead>
                  <TableHead>{t('column_date')}</TableHead>
                  <TableHead className="text-right">{t('column_actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: SellerOrder) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.order_number}</TableCell>
                    <TableCell className="font-medium">{order.buyer_name}</TableCell>
                    <TableCell>{order.items_count}</TableCell>
                    <TableCell className="font-semibold text-primary">
                      Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/seller/orders/${order.id}`}
                        className={cn(buttonVariants({ variant: 'outline', size: 'small' }))}
                      >
                        {t('detail_button')}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <PaginationSection page={page} totalPages={totalPages} updateParams={updateParams} />
        </>
      )}
    </div>
  );
}
