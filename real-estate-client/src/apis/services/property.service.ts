import axiosInstance from "../axiosInstance";
import type { PropertyQueryParams } from "@/modules/broker-dashboard-modules/types/property.types";

export const getPropertyService = (params?: PropertyQueryParams) => {
  return axiosInstance.get("/real-estate", { params });
};

export const getPropertyByIdService = (id: string) => {
  return axiosInstance.get(`/real-estate/${id}`);
};

export const getTrendingPropertiesService = (limit: number = 6) => {
  return axiosInstance.get("/real-estate/trending", { params: { limit } });
};

export const incrementPropertyViewsService = (id: string) => {
  return axiosInstance.post(`/real-estate/${id}/view`);
};