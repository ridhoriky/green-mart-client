import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/features/auth/api/userApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { UpdateUserRequest } from '@/features/auth/types/auth';

const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

/**
 * Fetches user profile detail by user ID.
 * @param id - User ID.
 * @returns Query result containing user profile.
 */
export const useUserQuery = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => await userApi.getUserById(id),
    enabled: Boolean(id),
  });

/**
 * Updates user profile detail by user ID.
 * @param id - User ID.
 * @returns Mutation result for profile update.
 */
export const useUpdateUserMutation = (id: string) => {
  const queryClient = useQueryClient();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => await userApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      if (accessToken) {
        setCredentials(updatedUser, accessToken);
      }
    },
  });
};
