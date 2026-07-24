import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userApi } from '@/features/auth/api/userApi';
import { apiClient } from '@/libs/apiClient';

describe('User API service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    it('fetches user profile data by ID', async () => {
      const mockUser = {
        id: 'usr-123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        is_active: true,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      };

      const getSpy = vi.spyOn(apiClient, 'get');
      getSpy.mockResolvedValueOnce({
        data: {
          status: 'success',
          message: 'User fetched',
          data: mockUser,
        },
      });

      const result = await userApi.getUserById('usr-123');

      expect(getSpy).toHaveBeenCalledWith('/users/usr-123');
      expect(result).toStrictEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('updates user profile and returns updated record', async () => {
      const updateData = { name: 'John Updated' };
      const mockUpdatedUser = {
        id: 'usr-123',
        name: 'John Updated',
        email: 'john@example.com',
        role: 'user',
        is_active: true,
        created_at: '2026-01-01',
        updated_at: '2026-01-02',
      };

      const putSpy = vi.spyOn(apiClient, 'put');
      putSpy.mockResolvedValueOnce({
        data: {
          status: 'success',
          message: 'User updated',
          data: mockUpdatedUser,
        },
      });

      const result = await userApi.updateUser('usr-123', updateData);

      expect(putSpy).toHaveBeenCalledWith('/users/usr-123', updateData);
      expect(result).toStrictEqual(mockUpdatedUser);
    });
  });
});
