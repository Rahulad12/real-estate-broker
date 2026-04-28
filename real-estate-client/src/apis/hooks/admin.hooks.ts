import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { AdminStats, UserWithPagination } from "@/modules/admin-modules/types/admin.types";

/**
 * Get admin dashboard statistics
 * @returns {UseQueryResult<AdminStats>}
 */
export const useGetAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response: AxiosResponse<{ success: boolean; data: AdminStats }> =
        await (await import("../services/admin.service")).getAdminStatsService();
      return response.data.data;
    },
  });
};

/**
 * Get all users (admin)
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {UseQueryResult<UserWithPagination>}
 */
export const useGetAllUsers = (page: number = 1, limit: number = 10) => {
  return useQuery<UserWithPagination>({
    queryKey: ["admin-users", page, limit],
    queryFn: async () => {
      const response: AxiosResponse<{ success: boolean; data: UserWithPagination }> =
        await (await import("../services/admin.service")).getAllUsersService(page, limit);
      return response.data.data;
    },
  });
};

/**
 * Delete a user (admin)
 * @returns {UseMutationResult}
 */
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await (await import("../services/admin.service")).deleteUserService(userId);
      return response.data;
    },
  });
};

/**
 * Delete any property (admin)
 * @returns {UseMutationResult}
 */
export const useAdminDeleteProperty = () => {
  return useMutation({
    mutationFn: async (propertyId: string) => {
      const response = await (await import("../services/admin.service")).adminDeletePropertyService(propertyId);
      return response.data;
    },
  });
};
