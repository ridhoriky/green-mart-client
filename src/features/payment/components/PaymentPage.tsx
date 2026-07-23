'use client';

import {
  CreditCard,
  Wallet,
  Landmark,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOrderDetailQuery } from '@/features/orders/hooks/useOrders';
import {
  useCreatePaymentMutation,
  usePaymentStatusQuery,
} from '@/features/payment/hooks/usePayment';
import { apiClient } from '@/libs/apiClient';
import { Link } from '@/libs/I18nNavigation';
import { getImageUrl } from '@/utils/Helpers';

type PaymentMethodType = 'bank_transfer' | 'e_wallet' | 'credit_card';

/**
 * PaymentPage component for completing payment and checking status.
 * @param props - Component props.
 * @returns The payment page element.
 */
export function PaymentPage(props: { orderId: string }) {
  const t = useTranslations();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('bank_transfer');
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Queries & Mutations
  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useOrderDetailQuery(props.orderId);
  const createPaymentMutation = useCreatePaymentMutation();
  const { data: statusData } = usePaymentStatusQuery(props.orderId);

  // Determine current status
  const currentStatus = statusData?.status ?? order?.status;

  const handlePay = () => {
    createPaymentMutation.mutate(
      {
        orderId: props.orderId,
        data: { payment_method: selectedMethod },
      },
      {
        onSuccess: (res) => {
          setPaymentRef(res.payment_id);
          toast.success(t('PaymentPage.processing'));
        },
        onError: () => {
          toast.error(t('PaymentPage.failed_title'));
        },
      },
    );
  };

  const handleSimulatePayment = async (status: 'success' | 'failed') => {
    const ref = paymentRef ?? props.orderId;
    if (!ref) {
      return;
    }

    setIsSimulating(true);
    try {
      await apiClient.post('/payments/callback', {
        payment_ref: ref,
        status,
      });
      toast.success(`Simulation of ${status} webhook triggered!`);
    } catch {
      toast.error('Failed to trigger callback simulation.');
    } finally {
      setIsSimulating(false);
    }
  };

  if (isOrderLoading) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-sm text-on-surface-variant">{t('OrderDetailPage.loading')}</p>
        </div>
      </div>
    );
  }

  if (isOrderError || !order) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md text-center md:px-margin-desktop md:py-stack-lg">
        <h1 className="font-headline-md text-headline-md mb-4 text-on-surface">
          {t('OrderDetailPage.not_found')}
        </h1>
        <Link href="/account/orders">
          <Button>{t('PaymentPage.back_to_orders')}</Button>
        </Link>
      </div>
    );
  }

  // Resolved statuses
  if (currentStatus === 'paid') {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-20 text-center">
        <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <CheckCircle2 className="mx-auto h-16 w-16 animate-bounce text-emerald-500" />
          <h1 className="mt-6 text-2xl font-bold text-on-surface">
            {t('PaymentPage.success_title')}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            {t('PaymentPage.success_subtitle')}
          </p>

          <div className="mt-6 space-y-2 rounded-xl bg-surface-container-low p-4 text-left text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-on-surface-variant">
                {t('PaymentPage.order_number')}
              </span>
              <span className="font-bold text-on-surface">{order.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-on-surface-variant">
                {t('PaymentPage.total_payment')}
              </span>
              <span className="font-bold text-primary">
                Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link href={`/account/orders/${order.id}`}>
              <Button className="w-full font-bold">{t('PaymentPage.view_order_details')}</Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline" className="w-full font-bold">
                {t('PaymentPage.back_to_orders')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStatus === 'failed') {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-20 text-center">
        <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <XCircle className="mx-auto h-16 w-16 text-rose-500" />
          <h1 className="mt-6 text-2xl font-bold text-on-surface">
            {t('PaymentPage.failed_title')}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">{t('PaymentPage.failed_subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              onClick={() => {
                window.location.reload();
              }}
              className="w-full font-bold"
            >
              {t('PaymentPage.pay_button')}
            </Button>
            <Link href="/account/orders">
              <Button variant="outline" className="w-full font-bold">
                {t('PaymentPage.back_to_orders')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStatus === 'expired') {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-20 text-center">
        <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <AlertCircle className="mx-auto h-16 w-16 text-amber-500" />
          <h1 className="mt-6 text-2xl font-bold text-on-surface">
            {t('PaymentPage.expired_title')}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            {t('PaymentPage.expired_subtitle')}
          </p>

          <div className="mt-8">
            <Link href="/account/orders">
              <Button className="w-full font-bold">{t('PaymentPage.back_to_orders')}</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // If payment was initiated, we show the waiting screen and start polling
  if (createPaymentMutation.isSuccess || paymentRef) {
    return (
      <div className="mx-auto max-w-md px-margin-mobile py-20 text-center">
        <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
          <h1 className="mt-6 text-2xl font-bold text-on-surface">
            {t('PaymentPage.waiting_payment')}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            {t('PaymentPage.processing')} {t('PaymentPage.waiting_payment')}
          </p>

          {/* Dev Helper - Simulation Webhook Trigger */}
          <div className="mt-8 rounded-xl border border-dashed border-outline bg-surface-container-low p-4">
            <p className="mb-2 text-xs font-bold tracking-wider text-on-surface uppercase">
              🧪 Developer Simulation Tool
            </p>
            <p className="text-xxs mb-4 text-on-surface-variant">
              Simulate standard payment gateway webhook responses locally.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => void handleSimulatePayment('success')}
                disabled={isSimulating}
                className="flex-1 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
              >
                Simulate Success
              </Button>
              <Button
                variant="outline"
                size="small"
                onClick={() => void handleSimulatePayment('failed')}
                disabled={isSimulating}
                className="flex-1 border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 dark:bg-rose-950/20 dark:text-rose-400"
              >
                Simulate Fail
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/account/orders">
              <Button variant="outline" className="w-full font-bold">
                {t('PaymentPage.back_to_orders')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Payment Selection View
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <Link
        href={`/account/orders/${order.id}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('PaymentPage.view_order_details')}
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Payment Methods */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <h1 className="font-title-lg text-title-lg mb-6 font-bold text-on-surface">
              {t('PaymentPage.method_label')}
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Bank Transfer */}
              <button
                onClick={() => {
                  setSelectedMethod('bank_transfer');
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all ${
                  selectedMethod === 'bank_transfer'
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-outline'
                }`}
              >
                <Landmark className="mb-3 h-8 w-8" />
                <span className="text-sm font-bold text-on-surface">
                  {t('PaymentPage.bank_transfer')}
                </span>
              </button>

              {/* E-Wallet */}
              <button
                onClick={() => {
                  setSelectedMethod('e_wallet');
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all ${
                  selectedMethod === 'e_wallet'
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-outline'
                }`}
              >
                <Wallet className="mb-3 h-8 w-8" />
                <span className="text-sm font-bold text-on-surface">
                  {t('PaymentPage.e_wallet')}
                </span>
              </button>

              {/* Credit Card */}
              <button
                onClick={() => {
                  setSelectedMethod('credit_card');
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all ${
                  selectedMethod === 'credit_card'
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-outline'
                }`}
              >
                <CreditCard className="mb-3 h-8 w-8" />
                <span className="text-sm font-bold text-on-surface">
                  {t('PaymentPage.credit_card')}
                </span>
              </button>
            </div>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <h2 className="mb-4 font-title-md text-title-md font-bold text-on-surface">
              {t('OrderDetailPage.order_info')}
            </h2>

            <div className="mb-4 max-h-48 divide-y divide-outline-variant overflow-y-auto">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                    <Image
                      src={getImageUrl(item.product_image, '/assets/images/placeholder.png')}
                      alt={item.product_name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xs font-bold text-on-surface">
                      {item.product_name}
                    </h3>
                    <p className="text-xxs mt-0.5 text-on-surface-variant">
                      {item.quantity} x Rp {Math.round(item.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right text-xs font-bold text-on-surface">
                    Rp {Math.round(item.subtotal).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-outline-variant pt-4">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{t('OrderDetailPage.subtotal')}</span>
                <span className="text-on-surface">
                  Rp{' '}
                  {Math.round(order.total_amount - (order.shipping_cost ?? 0)).toLocaleString(
                    'id-ID',
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{t('OrderDetailPage.shipping')}</span>
                <span className="text-on-surface">
                  {order.shipping_cost === undefined || order.shipping_cost === 0
                    ? t('OrderDetailPage.free')
                    : `Rp ${Math.round(order.shipping_cost).toLocaleString('id-ID')}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-outline-variant pt-3 text-title-md font-bold text-on-surface">
                <span>{t('OrderDetailPage.total')}</span>
                <span className="text-primary">
                  Rp {Math.round(order.total_amount).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePay}
              disabled={createPaymentMutation.isPending}
              className="mt-6 w-full font-bold shadow-md transition-all hover:shadow-lg"
            >
              {createPaymentMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('PaymentPage.processing')}
                </>
              ) : (
                t('PaymentPage.pay_button')
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
