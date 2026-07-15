'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Renders the error state screen for the cart page.
 *
 * @param props - The component props.
 * @returns The CartErrorState component.
 */
export function CartErrorState(props: { onRetry: () => void }) {
  const t = useTranslations('CartPage');

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Card className="mx-auto max-w-lg rounded-2xl border-error bg-error/5 p-8 text-center text-error">
        <h3 className="font-title-lg mb-2 text-body-lg font-bold text-error">{t('error_title')}</h3>
        <p className="mb-6 text-[13px] text-on-surface-variant">{t('error_desc')}</p>
        <Button onClick={props.onRetry} variant="destructive" className="rounded-full px-6">
          {t('retry')}
        </Button>
      </Card>
    </div>
  );
}
