/**
 * Represents the request payload for creating a payment.
 */
export type PaymentRequest = {
  payment_method: 'bank_transfer' | 'e_wallet' | 'credit_card';
};

/**
 * Represents the response payload from creating a payment.
 */
export type PaymentResponse = {
  payment_url?: string;
  payment_id: string;
  status: 'pending' | 'paid' | 'failed' | 'expired';
  expires_at?: string;
};

/**
 * Represents the status details of a payment.
 */
export type PaymentStatus = {
  status: 'pending' | 'paid' | 'failed' | 'expired';
  paid_at?: string;
};
