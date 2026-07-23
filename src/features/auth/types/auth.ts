/** User data returned from backend. */
export type UserResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
  is_active: boolean;
  phone?: string;
  created_at: string;
  updated_at: string;
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
  otp_code: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  new_password: string;
};

export type ResendOTPRequest = {
  email: string;
};

export type GoogleLoginRequest = {
  id_token: string;
};

export type UpdateUserRequest = {
  name?: string;
  phone?: string;
  avatar_url?: string;
};

// ────────────────────────────────────────────────
// Response types
// ────────────────────────────────────────────────

export type LoginResponse = {
  access_token: string;
  expires_at: number;
  message?: string;
  user: UserResponse;
};

export type RegisterResponse = {
  user: UserResponse;
};

export type AuthTokenResponse = {
  access_token: string;
  expires_at: number;
  user: UserResponse;
};
