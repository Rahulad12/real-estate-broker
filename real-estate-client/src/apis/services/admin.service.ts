import axiosInstance from "../axiosInstance";
import type { AdminStats, UserWithPagination } from "@/modules/admin-modules/types";

/**
 * Get admin dashboard statistics
 * @returns {Promise<AxiosResponse>} Response with stats data
 */
export const getAdminStatsService = () => {
  return axiosInstance.get("/admin/stats");
};

/**
 * Get all users (admin only)
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<AxiosResponse>} Response with users and pagination
 */
export const getAllUsersService = (page: number = 1, limit: number = 10) => {
  return axiosInstance.get("/admin/users", { params: { page, limit } });
};

/**
 * Delete a user (admin only)
 * @param {string} userId - User ID to delete
 * @returns {Promise<AxiosResponse>} Response with deleted user
 */
export const deleteUserService = (userId: string) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
};

/**
 * Delete any property (admin only)
 * @param {string} propertyId - Property ID to delete
 * @returns {Promise<AxiosResponse>} Response with deleted property
 */
export const adminDeletePropertyService = (propertyId: string) => {
  return axiosInstance.delete(`/admin/properties/${propertyId}`);
};
