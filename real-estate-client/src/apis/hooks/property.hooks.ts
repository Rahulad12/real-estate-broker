import { useQuery } from "@tanstack/react-query";
import { getPropertyService, getPropertyByIdService } from "../services/property.service";
import type { AxiosResponse } from "axios";
import type { PropertyQueryParams, PropertyWithPaginationResponse } from "@/modules/broker-dashboard-modules/types/property.types";
import type { Property } from "@/modules/property-details-modules";

export const useGetAllListedProperty = (params?: PropertyQueryParams) => {
  return useQuery({
    queryKey: ["listed-property", params],
    queryFn: async () => {
      const response: AxiosResponse<PropertyWithPaginationResponse> =
        await getPropertyService(params);
      return response.data.data;
    },
  });
};

export const useGetPropertyById = (id?: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("Property ID is required");
      const response: AxiosResponse<{ success: boolean; data: Property }> = await getPropertyByIdService(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};
