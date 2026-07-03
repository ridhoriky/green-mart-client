/* eslint-disable promise/prefer-await-to-callbacks */
import axios, { create } from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Env } from '@/libs/Env';

const BASE_URL = `${Env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/v1`;

export const apiClient = create({
  baseURL: BASE_URL,
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

      const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refreshToken='))
        ?.split('=')[1];

      if (refreshToken) {
        try {
          const { data } = await axios.post<{
            data?: { accessToken: string };
            accessToken?: string;
          }>(`${BASE_URL}/auth/refresh`, { refreshToken });
          const newAccessToken = data.data?.accessToken ?? data.accessToken;

          if (newAccessToken) {
            useAuthStore.getState().setAccessToken(newAccessToken);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return await apiClient(config);
          }
        } catch {
          useAuthStore.getState().clearCredentials();
        }
      }
    }

    throw error;
  },
);
