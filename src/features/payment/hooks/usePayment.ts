import { useMutation, useQuery } from '@tanstack/react-query';
import { paymentApi } from '@/features/payment/api/paymentApi';
import type { PaymentRequest } from '@/features/payment/types/payment';
import { useRouter } from '@/libs/I18nNavigation';

/**
 * Hook to handle payment creation mutation.
 * Redirects to the payment URL (for external gateways) or the internal status page.
 * @returns Mutation object.
 */
export const useCreatePaymentMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ orderId, data }: { orderId: string; data: PaymentRequest }) =>
      await paymentApi.createPayment(orderId, data),
    onSuccess: (paymentRes, variables) => {
      if (paymentRes.payment_url) {
        window.location.href = paymentRes.payment_url;
      } else {
        router.push(`/payment/${variables.orderId}`);
      }
    },
  });
};

/**
 * Hook to query and poll the payment status of an order.
 * Polls every 5 seconds as long as the status is pending.
 * @param orderId - Order UUID.
 * @returns Query result.
 */
export const usePaymentStatusQuery = (orderId: string) =>
  useQuery({
    queryKey: ['payment-status', orderId],
    queryFn: async () => await paymentApi.getPaymentStatus(orderId),
    enabled: Boolean(orderId),
    refetchInterval: (query) => {
      const { data } = query.state;
      return !data || data.status === 'pending' ? 5000 : false;
    },
  });
