/* eslint-disable promise/prefer-await-to-callbacks */
import axios, { create } from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { APIResponse, AuthTokenResponse } from '@/features/auth/types/auth';
import { Env } from '@/libs/Env';

const BASE_URL = `${Env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/v1`;

export const apiClient = create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Attach the access token from Zustand store to every request. */
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const retryMap = new WeakMap<InternalAxiosRequestConfig, boolean>();
let refreshPromise: Promise<string> | null = null;

/** On 401, attempt token refresh then retry the original request once. */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config } = error;
    if (!config) {
      throw error;
    }

    if (error.response?.status === 401 && !retryMap.has(config)) {
      retryMap.set(config, true);

      try {
        refreshPromise ??= (async () => {
          try {
            const res = await axios.post<APIResponse<AuthTokenResponse>>(
              `${BASE_URL}/auth/refresh`,
              {},
              { withCredentials: true },
            );
            const { accessToken, user } = res.data.data;
            useAuthStore.getState().setCredentials(user, accessToken);
            return accessToken;
          } finally {
            refreshPromise = null;
          }
        })();

        const newAccessToken = await refreshPromise;
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await apiClient(config);
      } catch (refreshError) {
        useAuthStore.getState().clearCredentials();
        throw refreshError;
      }
    }

    throw error;
  },
);
