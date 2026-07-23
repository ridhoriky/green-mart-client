'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';
import { z as zod } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useMyStoreQuery,
  useStoreStatsQuery,
  useUpdateStoreMutation,
} from '../hooks/useSellerStore';
import type { MyStore, StoreStats } from '../types/seller-store';

const storeSchema = zod.object({
  store_name: zod.string().min(3, 'Store name must be at least 3 characters.'),
  description: zod.string().optional(),
  logo_url: zod.string().optional(),
  banner_url: zod.string().optional(),
});

type StoreFormValues = z.infer<typeof storeSchema>;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

function StoreStatsOverview(props: { stats?: StoreStats; store?: MyStore; isLoading: boolean }) {
  const t = useTranslations('SellerStorePage');
  const revenue = props.stats?.total_revenue ?? 0;
  const sales = props.isLoading
    ? '-'
    : (props.stats?.total_orders ?? props.store?.total_sales ?? 0);
  const products = props.isLoading
    ? '-'
    : (props.stats?.total_products ?? props.store?.total_products ?? 0);
  const rating = (props.stats?.average_rating ?? props.store?.rating_avg ?? 0).toFixed(1);

  return (
    <div className="space-y-3">
      <h2 className="font-title-md text-title-md font-bold">{t('stats_title')}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
          <p className="text-body-sm font-medium text-on-surface-variant">{t('total_revenue')}</p>
          <p className="text-title-lg font-bold text-primary">{formatCurrency(revenue)}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
          <p className="text-body-sm font-medium text-on-surface-variant">{t('total_sales')}</p>
          <p className="text-title-lg font-bold text-on-surface">{sales}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
          <p className="text-body-sm font-medium text-on-surface-variant">{t('total_products')}</p>
          <p className="text-title-lg font-bold text-on-surface">{products}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
          <p className="text-body-sm font-medium text-on-surface-variant">{t('rating_avg')}</p>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-amber-500">star</span>
            <p className="text-title-lg font-bold text-on-surface">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreProfileForm(props: { store?: MyStore }) {
  const t = useTranslations('SellerStorePage');
  const updateMutation = useUpdateStoreMutation();
  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      store_name: props.store?.store_name ?? '',
      description: props.store?.description ?? '',
      logo_url: props.store?.logo_url ?? '',
      banner_url: props.store?.banner_url ?? '',
    },
  });

  useEffect(() => {
    if (props.store) {
      form.reset({
        store_name: props.store.store_name ?? '',
        description: props.store.description ?? '',
        logo_url: props.store.logo_url ?? '',
        banner_url: props.store.banner_url ?? '',
      });
    }
  }, [props.store, form]);

  const onSubmit = async (values: StoreFormValues) => {
    try {
      await updateMutation.mutateAsync(values);
      toast.success(t('update_success'));
    } catch {
      toast.error(t('update_failed'));
    }
  };

  const logoUrl = form.watch('logo_url');
  const bannerUrl = form.watch('banner_url');

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="mb-6 font-title-md text-title-md font-bold">{t('store_info_title')}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="store_name" className="text-sm font-medium">
            {t('field_store_name')}
          </label>
          <Input id="store_name" {...form.register('store_name')} />
          {form.formState.errors.store_name && (
            <p className="text-sm text-destructive">{form.formState.errors.store_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            {t('field_description')}
          </label>
          <textarea
            id="description"
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register('description')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="logo_url" className="text-sm font-medium">
            {t('field_logo_url')}
          </label>
          <Input
            id="logo_url"
            placeholder="https://..."
            {...form.register('logo_url')}
            onChange={(e) => {
              setLogoError(false);
              void form.register('logo_url').onChange(e);
            }}
          />
          {logoUrl && !logoError && (
            <div className="mt-2">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Logo Preview:</p>
              <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                <Image
                  src={logoUrl}
                  alt="Store Logo Preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => {
                    setLogoError(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="banner_url" className="text-sm font-medium">
            {t('field_banner_url')}
          </label>
          <Input
            id="banner_url"
            placeholder="https://..."
            {...form.register('banner_url')}
            onChange={(e) => {
              setBannerError(false);
              void form.register('banner_url').onChange(e);
            }}
          />
          {bannerUrl && !bannerError && (
            <div className="mt-2">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Banner Preview:</p>
              <div className="relative h-28 w-full overflow-hidden rounded-lg border">
                <Image
                  src={bannerUrl}
                  alt="Store Banner Preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => {
                    setBannerError(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? t('saving_button') : t('save_button')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function SellerStorePage() {
  const t = useTranslations('SellerStorePage');
  const { data: store, isLoading: isStoreLoading, error: storeError } = useMyStoreQuery();
  const { data: stats, isLoading: isStatsLoading } = useStoreStatsQuery();

  if (isStoreLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[32px] text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (storeError) {
    return (
      <div className="rounded-xl border border-error bg-error/10 p-6 text-center text-error">
        <p className="font-bold">{t('error_loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-headline-md text-headline-md font-bold">{t('title')}</h1>
          {store?.is_verified && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {t('verified_badge')}
            </span>
          )}
        </div>
        <p className="text-body-md mt-1 text-on-surface-variant">{t('subtitle')}</p>
      </div>

      <StoreStatsOverview stats={stats} store={store} isLoading={isStatsLoading} />
      <StoreProfileForm store={store} />
    </div>
  );
}
