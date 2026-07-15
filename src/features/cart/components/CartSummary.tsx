'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Renders the summary section of the cart including total price, subtotal,
 * shipping fee description, and a checkout button.
 *
 * @param props - The component props.
 * @returns The CartSummary component.
 */
export function CartSummary(props: { totalAmount: number; onCheckout: () => void }) {
  const t = useTranslations('CartPage');

  return (
    <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="font-title-lg text-title-lg mb-5 font-bold text-on-surface">
        {t('summary_title')}
      </h2>
      <div className="mb-4 space-y-4 border-b border-outline-variant pb-4">
        <div className="flex justify-between text-[13px] font-medium text-on-surface-variant">
          <span>{t('subtotal')}</span>
          <span>Rp {Math.round(props.totalAmount).toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-[13px] font-medium text-on-surface-variant">
          <span>{t('shipping')}</span>
          <span className="text-[12px] font-bold text-primary uppercase">{t('free')}</span>
        </div>
      </div>
      <div className="mb-6 flex justify-between font-title-md text-title-md font-bold text-on-surface">
        <span>{t('total')}</span>
        <span className="text-primary">
          Rp {Math.round(props.totalAmount).toLocaleString('id-ID')}
        </span>
      </div>
      <Button
        onClick={props.onCheckout}
        className="w-full rounded-md py-6 font-bold shadow-md transition-shadow hover:shadow-lg"
      >
        {t('checkout')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}
