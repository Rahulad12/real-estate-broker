import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminStats, UserWithPagination, SchedulingWithPagination, User } from "@/modules/admin-modules/types/admin.types";

/**
 * Get admin dashboard statistics
 */
export const useGetAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await (await import("../services/admin.service")).getAdminStatsService();
      return response.data.data;
    },
  });
};

/**
 * User management hooks
 */
export const useGetAllUsers = (page: number = 1, limit: number = 10) => {
  return useQuery<UserWithPagination>({
    queryKey: ["admin-users", page, limit],
    queryFn: async () => {
      const response = await (await import("../services/admin.service")).getAllUsersService(page, limit);
      return response.data.data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await (await import("../services/admin.service")).createUserService(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> }) => {
      const response = await (await import("../services/admin.service")).updateUserService(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await (await import("../services/admin.service")).deleteUserService(userId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};

/**
 * Property management hooks
 */
export const useAdminCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const response = await (await import("../services/admin.service")).adminCreatePropertyService(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};

export const useAdminUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      const response = await (await import("../services/admin.service")).adminUpdatePropertyService(id, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate both general and admin property queries
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useAdminDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: string) => {
      const response = await (await import("../services/admin.service")).adminDeletePropertyService(propertyId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

/**
 * Scheduling hooks
 */
export const useGetAllSchedulings = (page: number = 1, limit: number = 10) => {
  return useQuery<SchedulingWithPagination>({
    queryKey: ["admin-schedulings", page, limit],
    queryFn: async () => {
      const response = await (await import("../services/admin.service")).getAllSchedulingsService(page, limit);
      return response.data.data;
    },
  });
};

export const useUpdateSchedulingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      const response = await (await import("../services/admin.service")).updateSchedulingStatusService(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-schedulings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};

export const useGetSchedulingStats = () => {
  return useQuery({
    queryKey: ["scheduling-stats"],
    queryFn: async () => {
      const response = await (await import("../services/admin.service")).getSchedulingStatsService();
      return response.data.data;
    },
  });
};
