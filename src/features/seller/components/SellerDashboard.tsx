'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { sellerApi } from '@/features/seller/api/sellerApi';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

export const SellerDashboard = () => {
  const t = useTranslations('SellerDashboard');
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-dashboard'],
    queryFn: async () => await sellerApi.getDashboard('this_week'),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[32px] text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-error bg-error/10 p-6 text-center text-error">
        <p className="font-bold">{t('error')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline-md text-headline-md font-bold">{t('title')}</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-2 text-body-sm font-medium text-on-surface-variant">
            {t('total_revenue')}
          </p>
          <p className="text-title-lg font-bold text-primary">
            {formatCurrency(data?.summary.total_revenue ?? 0)}
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-2 text-body-sm font-medium text-on-surface-variant">
            {t('total_orders')}
          </p>
          <p className="text-title-lg font-bold text-on-surface">
            {data?.summary.total_orders ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-2 text-body-sm font-medium text-on-surface-variant">{t('items_sold')}</p>
          <p className="text-title-lg font-bold text-on-surface">
            {data?.summary.total_items_sold ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-2 text-body-sm font-medium text-on-surface-variant">
            {t('pending_orders')}
          </p>
          <p className="text-title-lg font-bold text-error">{data?.pending_orders ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="mb-4 font-title-md text-title-md font-bold">{t('recent_orders')}</h2>
          {!data?.recent_orders || data.recent_orders.length === 0 ? (
            <p className="text-body-sm text-on-surface-variant">{t('no_recent_orders')}</p>
          ) : (
            <ul className="space-y-4">
              {data.recent_orders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface">
                      {order.buyer_name}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatCurrency(order.total_amount)}</p>
                    <span className="inline-block rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
                      {order.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top Products */}
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="mb-4 font-title-md text-title-md font-bold">{t('top_products')}</h2>
          {!data?.top_products || data.top_products.length === 0 ? (
            <p className="text-body-sm text-on-surface-variant">{t('no_top_products')}</p>
          ) : (
            <ul className="space-y-4">
              {data.top_products.map((product) => (
                <li
                  key={product.product_id}
                  className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface">
                      {product.product_name}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">
                      <span className="material-symbols-outlined mr-1 align-middle text-[14px] text-orange-400">
                        star
                      </span>
                      {product.average_rating.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-on-surface">
                      {product.total_sold} {t('sold')}
                    </p>
                    <p className="text-[12px] text-primary">{formatCurrency(product.revenue)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
