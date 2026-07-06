import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function FlashSale() {
  const t = useTranslations('Index.FlashSale');

  return (
    <section className="mt-stack-lg bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8 sm:items-center">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
            <h2 className="flex items-center gap-2 font-headline-lg text-headline-lg">
              <span
                className="material-symbols-outlined text-error"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              {t('title')}
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-label-bold text-on-surface-variant">{t('ends_in')}</span>
              <div className="flex gap-1">
                <span className="rounded bg-error px-2 py-1 font-bold text-white">02</span>
                <span className="font-bold text-error">:</span>
                <span className="rounded bg-error px-2 py-1 font-bold text-white">45</span>
                <span className="font-bold text-error">:</span>
                <span className="rounded bg-error px-2 py-1 font-bold text-white">12</span>
              </div>
            </div>
          </div>
          <Link
            className="mb-1 font-label-bold whitespace-nowrap text-primary hover:underline sm:mb-0"
            href="/"
          >
            {t('view_all')}
          </Link>
        </div>
        <div className="hide-scrollbar flex gap-gutter overflow-x-auto pb-6">
          {/* Card 1 */}
          <Card className="product-card-hover group relative min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
            <Badge
              variant="error"
              className="absolute top-2 left-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase"
            >
              50% OFF
            </Badge>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP50p5foZKtlLlVs5Wn-EOyyF1aIQ3IutvyhYqjpGYrgmpzk0bgdxGSXpv4ya8JiUjZQJ_LzC3hvL44qozw1CKGpZLpHAgXidjX9EHhGdaXPyuafcAO6325qqqmfGitANK0ql5kt9TVejci14YnWdHBeCZM_5mDI0vFLnzzLdRKhEG9UNoURmwDCoxo1zZl4Pzsg32u-8soNh2y4YFSzuCR9yKRHKKF8XSV1MW_Q3FUIQWxQ3wS3xSFR2XBDwbMSu_fAfd97SGEpCd"
                alt="Organic Heirloom Tomatoes"
                fill
                sizes="600px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="primary"
                size="icon"
                className="absolute right-2 bottom-2 translate-y-4 rounded-full opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </Button>
            </div>
            <div className="p-4">
              <h4 className="mb-1 line-clamp-1 font-title-md text-body-lg">
                Organic Heirloom Tomatoes
              </h4>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-title-md font-bold text-primary">$2.50</span>
                <span className="text-body-sm text-on-surface-variant line-through">$5.00</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-[10px] text-on-surface-variant uppercase">
                  <span>Available: 12</span>
                  <span>Sold: 48</span>
                </div>
                <Progress value={80} indicatorClassName="bg-error" className="h-1.5" />
              </div>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="product-card-hover group relative min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
            <Badge
              variant="error"
              className="absolute top-2 left-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase"
            >
              30% OFF
            </Badge>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZH7DQUnMwUNz6eQVMgrmEJhWq0nzS9c2mTlN1RSYVyWbjcLZpFshcX2TY-gapSNkteew2GkdYUldmmrPyfpoLf0UxQuH2jYy73fNfM-scjz2xtec3GIJRJoT79ehmAu0lVwbcbBxQ5ZCJFzqR1ineU_WN4SPfO3o0PDKgH5GyGvOgwaU5mfAuaOPyz_ReH8jMRpy9CeYh5AVdxENmTE6QbTV9Yl3EKx1aU8eQG6Qm0mS_HbLxFK1zYFHmnmijKkI8HYKjFjydGWO"
                alt="Premium Jasmine Rice 5kg"
                fill
                sizes="600px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="primary"
                size="icon"
                className="absolute right-2 bottom-2 translate-y-4 rounded-full opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </Button>
            </div>
            <div className="p-4">
              <h4 className="mb-1 line-clamp-1 font-title-md text-body-lg">
                Premium Jasmine Rice 5kg
              </h4>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-title-md font-bold text-primary">$12.00</span>
                <span className="text-body-sm text-on-surface-variant line-through">$18.00</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-[10px] text-on-surface-variant uppercase">
                  <span>Available: 5</span>
                  <span>Sold: 95</span>
                </div>
                <Progress value={95} indicatorClassName="bg-error" className="h-1.5" />
              </div>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="product-card-hover group relative min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
            <Badge
              variant="error"
              className="absolute top-2 left-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase"
            >
              40% OFF
            </Badge>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoqq1UJyd5BAhbcLnQHlSPoM8WQcxQci_-bG0p28iGRIvisPrXnr-YXHGJWkikZhc_UQmnL0FdOWDeCdWUBoGR1dJGQnGfG1hcGq5uORwyW5anCZRcN2wUzAZBDaY5kBhUYBbdNOnwZtts9el1fT_5RclOjjT8B_oi1dd-BZORj2OoKpAGep4OHTev8SYos-SlZrThFwe5MJjlzEPCKys3nozdwb4F-eyxZAgq6AKgoDhbgcCyClSASK8Juc9e8pXfaGPRVZMMyNaf"
                alt="Fresh Green Grapes"
                fill
                sizes="600px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="primary"
                size="icon"
                className="absolute right-2 bottom-2 translate-y-4 rounded-full opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </Button>
            </div>
            <div className="p-4">
              <h4 className="mb-1 line-clamp-1 font-title-md text-body-lg">Fresh Green Grapes</h4>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-title-md font-bold text-primary">$3.20</span>
                <span className="text-body-sm text-on-surface-variant line-through">$5.50</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-[10px] text-on-surface-variant uppercase">
                  <span>Available: 20</span>
                  <span>Sold: 80</span>
                </div>
                <Progress value={80} indicatorClassName="bg-error" className="h-1.5" />
              </div>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className="product-card-hover group relative min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
            <Badge
              variant="error"
              className="absolute top-2 left-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase"
            >
              25% OFF
            </Badge>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfALjQuLdalHXEN5mkWXLzRpitXYIXaPYzVpl6D0AfzxzSC9lefC-X5and-xXghQzZqm7jbAmcs2sPJkwca-0HR0J3bwLyGq_X6ASDKp2kj4gWX2WT8XZl8vzm-wCda6fCbVR5sJyh9ND2282UaBPRfeQ4LSF8tTPmfgIVjKaizLn0_hOSL7gHAScxL3ZxXEsFXgj6m125nQ5c6icOrjZ9YftZc6ecyTL4iN5CO2YuCLxpJEkWSJaj3mc99bKupCuzrchTzYjZgxh7"
                alt="Organic Farm Eggs"
                fill
                sizes="600px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="primary"
                size="icon"
                className="absolute right-2 bottom-2 translate-y-4 rounded-full opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </Button>
            </div>
            <div className="p-4">
              <h4 className="mb-1 line-clamp-1 font-title-md text-body-lg">Organic Farm Eggs</h4>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-title-md font-bold text-primary">$4.50</span>
                <span className="text-body-sm text-on-surface-variant line-through">$6.00</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-[10px] text-on-surface-variant uppercase">
                  <span>Available: 15</span>
                  <span>Sold: 45</span>
                </div>
                <Progress value={75} indicatorClassName="bg-error" className="h-1.5" />
              </div>
            </div>
          </Card>

          {/* Card 5 */}
          <Card className="product-card-hover group relative min-w-[240px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-white">
            <Badge
              variant="error"
              className="absolute top-2 left-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase"
            >
              15% OFF
            </Badge>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP50p5foZKtlLlVs5Wn-EOyyF1aIQ3IutvyhYqjpGYrgmpzk0bgdxGSXpv4ya8JiUjZQJ_LzC3hvL44qozw1CKGpZLpHAgXidjX9EHhGdaXPyuafcAO6325qqqmfGitANK0ql5kt9TVejci14YnWdHBeCZM_5mDI0vFLnzzLdRKhEG9UNoURmwDCoxo1zZl4Pzsg32u-8soNh2y4YFSzuCR9yKRHKKF8XSV1MW_Q3FUIQWxQ3wS3xSFR2XBDwbMSu_fAfd97SGEpCd"
                alt="Crisp Lettuce"
                fill
                sizes="600px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="primary"
                size="icon"
                className="absolute right-2 bottom-2 translate-y-4 rounded-full opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </Button>
            </div>
            <div className="p-4">
              <h4 className="mb-1 line-clamp-1 font-title-md text-body-lg">Crisp Lettuce</h4>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-title-md font-bold text-primary">$1.50</span>
                <span className="text-body-sm text-on-surface-variant line-through">$1.80</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-[10px] text-on-surface-variant uppercase">
                  <span>Available: 30</span>
                  <span>Sold: 20</span>
                </div>
                <Progress value={40} indicatorClassName="bg-error" className="h-1.5" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
