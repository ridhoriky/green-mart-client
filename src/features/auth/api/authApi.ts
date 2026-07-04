import type {
  APIResponse,
  AuthTokenResponse,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
  RegisterResponse,
  ResendOTPRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from '@/features/auth/types/auth';
import { apiClient } from '@/libs/apiClient';

export const authApi = {
  /**
   * Sign in with email + password.
   * @param data Login request data.
   * @returns Login response promise.
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>('/auth/login', data);
    return res.data;
  },

  /**
   * Create a new account.
   * @param data Register request data.
   * @returns Register response promise.
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await apiClient.post<RegisterResponse>('/auth/register', data);
    return res.data;
  },

  /**
   * Verify email address using OTP code sent to user's email.
   * @param data Verification request data.
   * @returns API response promise.
   */
  verifyEmail: async (data: VerifyEmailRequest): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/auth/verify-email', data);
    return res.data;
  },

  /**
   * Resend OTP email verification code.
   * @param data OTP resend request data.
   * @returns API response promise.
   */
  resendOtp: async (data: ResendOTPRequest): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/auth/resend-otp', data);
    return res.data;
  },

  /**
   * Request a password reset email.
   * @param data Forgot password request data.
   * @returns API response promise.
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/auth/forgot-password', data);
    return res.data;
  },

  /**
   * Reset password using the token from the reset email.
   * @param data Reset password request data.
   * @returns API response promise.
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/auth/reset-password', data);
    return res.data;
  },

  /**
   * Silently refresh the access token using a refresh token.
   * @param data Refresh token request data.
   * @returns Auth token response promise.
   */
  refreshToken: async (data: RefreshTokenRequest): Promise<AuthTokenResponse> => {
    const res = await apiClient.post<AuthTokenResponse>('/auth/refresh', data);
    return res.data;
  },

  /**
   * Invalidate the current session on the backend.
   * @param data Logout request data.
   * @returns API response promise.
   */
  logout: async (data: LogoutRequest): Promise<APIResponse> => {
    const res = await apiClient.post<APIResponse>('/auth/logout', data);
    return res.data;
  },

  /**
   * Sign in or register via Google OAuth ID token.
   * @param data Google login request containing the ID token from Google popup.
   * @returns Login response promise.
   */
  googleLogin: async (data: GoogleLoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>('/auth/google', data);
    return res.data;
  },
};
