import { Star, Calendar, ShoppingBag, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { StoreDetail } from '@/features/stores/types/store';

type StoreHeaderProps = {
  store: StoreDetail;
};

/**
 * Renders the store header including banner, logo, verified badge, name, description and key stats.
 *
 * @param props - Component props containing the store detail.
 * @returns The StoreHeader component.
 */
export function StoreHeader(props: StoreHeaderProps) {
  const t = useTranslations('StorePage');

  const bannerUrl =
    props.store.banner_url ??
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=60';
  const logoUrl =
    props.store.logo_url ??
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=150&auto=format&fit=crop&q=60';
  const formattedDate = new Date(props.store.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-xs">
      {/* Banner */}
      <div className="relative h-32 w-full bg-linear-to-r from-green-600 to-emerald-800 md:h-48">
        {props.store.banner_url ? (
          <Image
            src={bannerUrl}
            alt={props.store.store_name}
            fill
            className="object-cover opacity-80"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-emerald-600/20 to-green-700/20" />
        )}
      </div>

      {/* Profile Details Container */}
      <div className="px-6 pt-4 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          {/* Avatar and Info */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start md:gap-5">
            {/* Avatar (overlaps banner slightly) */}
            <div className="relative -mt-16 h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-white shadow-md md:-mt-20 md:h-32 md:w-32">
              <Image
                src={logoUrl}
                alt={props.store.store_name}
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-end pt-2 sm:pt-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-headline-md text-[20px] font-bold text-on-surface md:text-[24px]">
                  {props.store.store_name}
                </h1>
                {props.store.is_verified && (
                  <Badge className="flex items-center gap-1 bg-primary px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-primary/95">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span>{t('verified')}</span>
                  </Badge>
                )}
              </div>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-on-surface-variant">
                {props.store.description}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-outline-variant pt-4 sm:grid-cols-4 md:border-t-0 md:pt-0">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">
                  Rating
                </p>
                <p className="text-[14px] font-bold text-on-surface">
                  {props.store.rating_avg.toFixed(1)}
                </p>
              </div>
            </div>

            {/* Total Products */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-primary">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">
                  Products
                </p>
                <p className="text-[14px] font-bold text-on-surface">
                  {props.store.total_products}
                </p>
              </div>
            </div>

            {/* Total Sales */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">
                  Sales
                </p>
                <p className="text-[14px] font-bold text-on-surface">
                  {props.store.total_sales.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">
                  Joined
                </p>
                <p className="text-[14px] font-bold text-on-surface">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
