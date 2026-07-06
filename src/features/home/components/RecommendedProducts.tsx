import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function RecommendedProducts() {
  const t = useTranslations('Index.RecommendedProducts');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-mobile md:px-margin-desktop">
      <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
        <h2 className="font-headline-lg text-headline-lg">{t('title')}</h2>
        <Link className="font-label-bold whitespace-nowrap text-primary hover:underline" href="/">
          {t('view_all')}
        </Link>
      </div>
      <div className="hide-scrollbar flex gap-gutter overflow-x-auto pb-6">
        {/* Card 1 */}
        <Card className="product-card-hover group min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="relative aspect-square overflow-hidden bg-surface-container-low">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoqq1UJyd5BAhbcLnQHlSPoM8WQcxQci_-bG0p28iGRIvisPrXnr-YXHGJWkikZhc_UQmnL0FdOWDeCdWUBoGR1dJGQnGfG1hcGq5uORwyW5anCZRcN2kUzAZBDaY5kBhUYBbdNOnwZtts9el1fT_5RclOjjT8B_oi1dd-BZORj2OoKpAGep4OHTev8SYos-SlZrThFwe5MJjlzEPCKys3nozdwb4F-eyxZAgq6AKgoDhbgcCyClSASK8Juc9e8pXfaGPRVZMMyNaf"
              alt="Green Seedless Grapes"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge
              variant="success"
              className="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              ORGANIC
            </Badge>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px]">store</span>
              Sarah's Greens
            </div>
            <h4 className="mb-2 line-clamp-2 h-10 font-title-md text-body-sm font-bold">
              Premium Green Seedless Grapes 500g
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$4.50</span>
              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[12px] text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.9 (1.2k)
              </div>
            </div>
            <div className="mt-2 text-[10px] text-on-surface-variant">Sold 4k+ • Oregon</div>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="product-card-hover group min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="relative aspect-square overflow-hidden bg-surface-container-low">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfALjQuLdalHXEN5mkWXLzRpitXYIXaPYzVpl6D0AfzxzSC9lefC-X5and-xXghQzZqm7jbAmcs2sPJkwca-0HR0J3bwLyGq_X6ASDKp2kj4gWX2WT8XZl8vzm-wCda6fCbVR5sJyh9ND2282UaBPRfeQ4LSF8tTPmfgIVjKaizLn0_hOSL7gHAScxL3ZxXEsFXgj6m125nQ5c6icOrjZ9YftZc6ecyTL4iN5CO2YuCLxpJEkWSJaj3mc99bKupCuzrchTzYjZgxh7"
              alt="Farm Fresh Brown Eggs"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              FREE RANGE
            </Badge>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px]">store</span>
              Heritage Hills
            </div>
            <h4 className="mb-2 line-clamp-2 h-10 font-title-md text-body-sm font-bold">
              Farm Fresh Brown Eggs (12 pcs)
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$6.20</span>
              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[12px] text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                5.0 (850)
              </div>
            </div>
            <div className="mt-2 text-[10px] text-on-surface-variant">Sold 2.1k • Texas</div>
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="product-card-hover group min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="relative aspect-square overflow-hidden bg-surface-container-low">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP50p5foZKtlLlVs5Wn-EOyyF1aIQ3IutvyhYqjpGYrgmpzk0bgdxGSXpv4ya8JiUjZQJ_LzC3hvL44qozw1CKGpZLpHAgXidjX9EHhGdaXPyuafcAO6325qqqmfGitANK0ql5kt9TVejci14YnWdHBeCZM_5mDI0vFLnzzLdRKhEG9UNoURmwDCoxo1zZl4Pzsg32u-8soNh2y4YFSzuCR9yKRHKKF8XSV1MW_Q3FUIQWxQ3wS3xSFR2XBDwbMSu_fAfd97SGEpCd"
              alt="Organic Heirloom Tomatoes"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge
              variant="success"
              className="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              ORGANIC
            </Badge>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px]">store</span>
              Farmer Junaid
            </div>
            <h4 className="mb-2 line-clamp-2 h-10 font-title-md text-body-sm font-bold">
              Organic Heirloom Tomatoes 1kg
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$4.80</span>
              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[12px] text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.8 (640)
              </div>
            </div>
            <div className="mt-2 text-[10px] text-on-surface-variant">Sold 1.5k • California</div>
          </div>
        </Card>

        {/* Card 4 */}
        <Card className="product-card-hover group min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="relative aspect-square overflow-hidden bg-surface-container-low">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZH7DQUnMwUNz6eQVMgrmEJhWq0nzS9c2mTlN1RSYVyWbjcLZpFshcX2TY-gapSNkteew2GkdYUldmmrPyfpoLf0UxQuH2jYy73fNfM-scjz2xtec3GIJRJoT79ehmAu0lVwbcbBxQ5ZCJFzqR1ineU_WN4SPfO3o0PDKgH5GyGvOgwaU5mfAuaOPyz_ReH8jMRpy9CeYh5AVdxENmTE6QbTV9Yl3EKx1aU8eQG6Qm0mS_HbLxFK1zYFHmnmijKkI8HYKjFjydGWO"
              alt="Premium Jasmine Rice"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge
              variant="default"
              className="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              BEST SELLER
            </Badge>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px]">store</span>
              GreenMart
            </div>
            <h4 className="mb-2 line-clamp-2 h-10 font-title-md text-body-sm font-bold">
              Premium Jasmine Rice 2kg
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$8.50</span>
              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[12px] text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.9 (3.2k)
              </div>
            </div>
            <div className="mt-2 text-[10px] text-on-surface-variant">Sold 12k+ • Nationwide</div>
          </div>
        </Card>

        {/* Card 5 */}
        <Card className="product-card-hover group min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="relative aspect-square overflow-hidden bg-surface-container-low">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoqq1UJyd5BAhbcLnQHlSPoM8WQcxQci_-bG0p28iGRIvisPrXnr-YXHGJWkikZhc_UQmnL0FdOWDeCdWUBoGR1dJGQnGfG1hcGq5uORwyW5anCZRcN2kUzAZBDaY5kBhUYBbdNOnwZtts9el1fT_5RclOjjT8B_oi1dd-BZORj2OoKpAGep4OHTev8SYos-SlZrThFwe5MJjlzEPCKys3nozdwb4F-eyxZAgq6AKgoDhbgcCyClSASK8Juc9e8pXfaGPRVZMMyNaf"
              alt="Fresh Avocados"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge
              variant="success"
              className="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              ORGANIC
            </Badge>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px]">store</span>
              Sarah's Greens
            </div>
            <h4 className="mb-2 line-clamp-2 h-10 font-title-md text-body-sm font-bold">
              Fresh Hass Avocados (3 pcs)
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$5.50</span>
              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[12px] text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.7 (420)
              </div>
            </div>
            <div className="mt-2 text-[10px] text-on-surface-variant">Sold 800+ • Oregon</div>
          </div>
        </Card>
      </div>
    </section>
  );
}
