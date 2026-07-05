/** User data returned from backend. */
export type UserResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Generic API response wrapper from backend. */
export type APIResponse<T = unknown> = {
  status: 'success' | 'error';
  message: string;
  data: T;
  error?: string;
};

/**
 * API error shape returned on failure responses.
 * @public
 */
export type APIError = {
  code: number;
  message: string;
  details: string[];
};

// ────────────────────────────────────────────────
// Request types
// ────────────────────────────────────────────────

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
  role: string;
};

export type VerifyEmailRequest = {
  email: string;
  otpCode: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ResendOTPRequest = {
  email: string;
};

export type GoogleLoginRequest = {
  idToken: string;
};

// ────────────────────────────────────────────────
// Response types
// ────────────────────────────────────────────────

export type LoginResponse = {
  accessToken: string;
  expiresAt: number;
  user: UserResponse;
};

export type RegisterResponse = {
  user: UserResponse;
};

export type AuthTokenResponse = {
  accessToken: string;
  expiresAt: number;
  user: UserResponse;
};
