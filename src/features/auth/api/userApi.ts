import type { APIResponse, UpdateUserRequest, UserResponse } from '@/features/auth/types/auth';
import { apiClient } from '@/libs/apiClient';

export const userApi = {
  /**
   * Fetch user details by user ID.
   * @param id User ID.
   * @returns User response promise.
   */
  getUserById: async (id: string): Promise<UserResponse> => {
    const res = await apiClient.get<APIResponse<UserResponse>>(`/users/${id}`);
    return res.data.data;
  },

  /**
   * Update user details by user ID.
   * @param id User ID.
   * @param data User update payload.
   * @returns Updated user response promise.
   */
  updateUser: async (id: string, data: UpdateUserRequest): Promise<UserResponse> => {
    const res = await apiClient.put<APIResponse<UserResponse>>(`/users/${id}`, data);
    return res.data.data;
  },
};
