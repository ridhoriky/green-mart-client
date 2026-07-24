import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function FeaturedFarmers() {
  const t = useTranslations('Index.FeaturedFarmers');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg">{t('title')}</h2>
        <Link className="font-label-bold text-primary hover:underline" href="/">
          {t('view_all')}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {/* Farmer 1 */}
        <Card className="group rounded-2xl p-6 text-center transition-all hover:shadow-xl">
          <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/assets/images/farmer-01.jpg" alt="Farmer Junaid" />
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Farmer Junaid</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Highland Farms, CA
          </p>
          <Button variant="outline" className="h-10 w-full font-label-bold text-sm">
            {t('visit_store')}
          </Button>
        </Card>

        {/* Farmer 2 */}
        <Card className="group rounded-2xl p-6 text-center transition-all hover:shadow-xl">
          <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/assets/images/farmer-02.jpg" alt="Sarah's Greens" />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Sarah's Greens</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Valley Eco Farm, OR
          </p>
          <Button variant="outline" className="h-10 w-full font-label-bold text-sm">
            {t('visit_store')}
          </Button>
        </Card>

        {/* Farmer 3 */}
        <Card className="group hidden rounded-2xl p-6 text-center transition-all hover:shadow-xl sm:block">
          <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/assets/images/farmer-03.jpg" alt="Old Oak Farm" />
            <AvatarFallback>OF</AvatarFallback>
          </Avatar>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Old Oak Farm</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Heritage Hills, TX
          </p>
          <Button variant="outline" className="h-10 w-full font-label-bold text-sm">
            {t('visit_store')}
          </Button>
        </Card>

        {/* Farmer 4 */}
        <Card className="group hidden rounded-2xl p-6 text-center transition-all hover:shadow-xl lg:block">
          <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/assets/images/farmer-04.jpg" alt="Citrus Grove Co." />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="font-title-md text-body-lg font-bold">Citrus Grove Co.</h4>
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="mb-4 flex items-center justify-center gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Sunshine Valley, FL
          </p>
          <Button variant="outline" className="h-10 w-full font-label-bold text-sm">
            {t('visit_store')}
          </Button>
        </Card>
      </div>
    </section>
  );
}
