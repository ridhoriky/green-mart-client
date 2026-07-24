import type { APIResponse } from '@/features/auth/types/auth';
import type {
  PaymentRequest,
  PaymentResponse,
  PaymentStatus,
} from '@/features/payment/types/payment';
import { apiClient } from '@/libs/apiClient';

/**
 * Backend payment result schema.
 */
type BackendPaymentResult = {
  expires_at?: string;
  order_id: string;
  payment_ref: string;
  payment_url?: string;
  status: string;
};

/**
 * Backend payment status schema.
 */
type BackendPaymentStatus = {
  order_id: string;
  paid_at?: string;
  payment_ref: string;
  status: string;
};

/**
 * Maps a backend payment status string to frontend status.
 * @param status - The backend status.
 * @returns Mapped status.
 */
function mapPaymentStatusValue(status: string): 'pending' | 'paid' | 'failed' | 'expired' {
  if (status === 'success' || status === 'paid') {
    return 'paid';
  }
  if (status === 'failed') {
    return 'failed';
  }
  if (status === 'expired') {
    return 'expired';
  }
  return 'pending';
}

/**
 * Maps backend payment result to frontend payment response.
 * @param result - The backend payment result.
 * @returns Mapped frontend payment response.
 */
function mapPaymentResponse(result: BackendPaymentResult): PaymentResponse {
  return {
    payment_url: result.payment_url,
    payment_id: result.payment_ref,
    status: mapPaymentStatusValue(result.status),
    expires_at: result.expires_at,
  };
}

/**
 * Maps backend payment status to frontend payment status.
 * @param paymentStatus - The backend payment status.
 * @returns Mapped frontend payment status.
 */
function mapPaymentStatus(paymentStatus: BackendPaymentStatus): PaymentStatus {
  return {
    status: mapPaymentStatusValue(paymentStatus.status),
    paid_at: paymentStatus.paid_at,
  };
}

export const paymentApi = {
  /**
   * Creates a payment session/URL for a given order ID.
   * @param orderId - The target order UUID.
   * @param data - The payment method request parameters.
   * @returns The created payment response metadata.
   */
  createPayment: async (orderId: string, data: PaymentRequest): Promise<PaymentResponse> => {
    const res = await apiClient.post<APIResponse<BackendPaymentResult>>(
      `/orders/${orderId}/pay`,
      data,
    );
    return mapPaymentResponse(res.data.data);
  },

  /**
   * Retrieves the current payment status of a given order.
   * @param orderId - The target order UUID.
   * @returns The resolved payment status.
   */
  getPaymentStatus: async (orderId: string): Promise<PaymentStatus> => {
    const res = await apiClient.get<APIResponse<BackendPaymentStatus>>(
      `/orders/${orderId}/payment-status`,
    );
    return mapPaymentStatus(res.data.data);
  },
};
