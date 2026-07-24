'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { sellerApi } from '@/features/seller/api/sellerApi';
import type {
  OrderSummary,
  SellerDashboard as DashboardData,
  SellerTopProduct,
} from '@/features/seller/types/seller';
import { Link } from '@/libs/I18nNavigation';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

function DashboardHeader() {
  const t = useTranslations('SellerDashboard');

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="font-headline-md text-headline-md font-bold">{t('title')}</h1>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/seller/products"
          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface shadow-xs transition-colors hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          Produk
        </Link>
        <Link
          href="/seller/orders"
          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface shadow-xs transition-colors hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
          Pesanan
        </Link>
        <Link
          href="/seller/store"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-[16px]">store</span>
          Pengaturan Toko
        </Link>
      </div>
    </div>
  );
}

function DashboardStatsCards(props: {
  revenue: number;
  totalOrders: number;
  itemsSold: number;
  pendingOrders: number;
}) {
  const t = useTranslations('SellerDashboard');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <p className="mb-2 text-body-sm font-medium text-on-surface-variant">
          {t('total_revenue')}
        </p>
        <p className="text-title-lg font-bold text-primary">{formatCurrency(props.revenue)}</p>
      </div>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <p className="mb-2 text-body-sm font-medium text-on-surface-variant">{t('total_orders')}</p>
        <p className="text-title-lg font-bold text-on-surface">{props.totalOrders}</p>
      </div>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <p className="mb-2 text-body-sm font-medium text-on-surface-variant">{t('items_sold')}</p>
        <p className="text-title-lg font-bold text-on-surface">{props.itemsSold}</p>
      </div>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <p className="mb-2 text-body-sm font-medium text-on-surface-variant">
          {t('pending_orders')}
        </p>
        <p className="text-title-lg font-bold text-error">{props.pendingOrders}</p>
      </div>
    </div>
  );
}

function RecentOrdersList(props: { orders?: OrderSummary[] }) {
  const t = useTranslations('SellerDashboard');

  if (!props.orders || props.orders.length === 0) {
    return <p className="text-body-sm text-on-surface-variant">{t('no_recent_orders')}</p>;
  }

  return (
    <ul className="space-y-4">
      {props.orders.map((order) => (
        <li
          key={order.id}
          className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0"
        >
          <div>
            <p className="font-label-bold text-label-bold text-on-surface">{order.buyer_name}</p>
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
  );
}

function TopProductsList(props: { products?: SellerTopProduct[] }) {
  const t = useTranslations('SellerDashboard');

  if (!props.products || props.products.length === 0) {
    return <p className="text-body-sm text-on-surface-variant">{t('no_top_products')}</p>;
  }

  return (
    <ul className="space-y-4">
      {props.products.map((product) => (
        <li
          key={product.product_id}
          className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0"
        >
          <div>
            <p className="font-label-bold text-label-bold font-semibold text-on-surface">
              {product.product_name}
            </p>
            <p className="text-[12px] text-on-surface-variant">
              <span className="material-symbols-outlined mr-1 align-middle text-[14px] text-amber-500">
                star
              </span>
              {(product.average_rating ?? 0).toFixed(1)}
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
  );
}

function DashboardMainView(props: { dashboard?: DashboardData }) {
  const t = useTranslations('SellerDashboard');

  const revenue = props.dashboard?.summary.total_revenue ?? 0;
  const totalOrders = props.dashboard?.summary.total_orders ?? 0;
  const itemsSold = props.dashboard?.summary.total_items_sold ?? 0;
  const topProducts = props.dashboard?.top_products ?? [];

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStatsCards
        revenue={revenue}
        totalOrders={totalOrders}
        itemsSold={itemsSold}
        pendingOrders={props.dashboard?.pending_orders ?? 0}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-title-md text-title-md font-bold">{t('recent_orders')}</h2>
            <Link
              href="/seller/orders"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <RecentOrdersList orders={props.dashboard?.recent_orders} />
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-title-md text-title-md font-bold">{t('top_products')}</h2>
            <Link
              href="/seller/products"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <TopProductsList products={topProducts} />
        </div>
      </div>
    </div>
  );
}

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

  return <DashboardMainView dashboard={data} />;
};
