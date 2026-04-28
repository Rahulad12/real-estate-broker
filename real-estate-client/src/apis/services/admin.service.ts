import axiosInstance from "../axiosInstance";
import type { User } from "@/modules/admin-modules/types/admin.types";

/**
 * Get admin dashboard statistics
 * @returns {Promise<AxiosResponse>} Response with stats data
 */
export const getAdminStatsService = () => {
  return axiosInstance.get("/admin/stats");
};

/**
 * User management
 */
export const getAllUsersService = (page: number = 1, limit: number = 10) => {
  return axiosInstance.get("/admin/users", { params: { page, limit } });
};

export const createUserService = (data: Partial<User>) => {
  return axiosInstance.post("/admin/users", data);
};

export const updateUserService = (id: string, data: Partial<User>) => {
  return axiosInstance.patch(`/admin/users/${id}`, data);
};

export const deleteUserService = (userId: string) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
};

/**
 * Property management
 */
export const adminCreatePropertyService = (data: Record<string, unknown>) => {
  return axiosInstance.post("/admin/properties", data);
};

export const adminUpdatePropertyService = (id: string, data: Record<string, unknown>) => {
  return axiosInstance.patch(`/admin/properties/${id}`, data);
};

export const adminDeletePropertyService = (propertyId: string) => {
  return axiosInstance.delete(`/admin/properties/${propertyId}`);
};

/**
 * Scheduling management
 */
export const getAllSchedulingsService = (page: number = 1, limit: number = 10) => {
  return axiosInstance.get("/scheduling", { params: { page, limit } });
};

export const updateSchedulingStatusService = (id: string, data: any) => {
  return axiosInstance.patch(`/scheduling/${id}`, data);
};

export const getSchedulingStatsService = () => {
  return axiosInstance.get("/scheduling/stats");
};
