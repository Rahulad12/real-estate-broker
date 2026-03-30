import { useQuery } from "@tanstack/react-query";
import { getPropertyService } from "../services/property.service";
import type { AxiosResponse } from "axios";
import type { PropertyQueryParams, PropertyWithPaginationResponse } from "@/modules/broker-dashboard-modules/types/property.types";

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
