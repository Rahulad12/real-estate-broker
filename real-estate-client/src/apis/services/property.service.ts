import axiosInstance from "../axiosInstance";
import type { PropertyQueryParams } from "@/modules/broker-dashboard-modules/types/property.types";

export const getPropertyService = (params?: PropertyQueryParams) => {
  return axiosInstance.get("/real-estate", { params });
};