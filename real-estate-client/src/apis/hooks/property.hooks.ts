import { useQuery } from "@tanstack/react-query";
import { getPropertyService } from "../services/property.service";
import type { AxiosResponse } from "axios";
import type { PropertyResponse } from "@/modules/broker-dashboard-modules/types/property.types";

export const useGetAllListedProperty = () => {
  return useQuery({
    queryKey: ["listed-property"],
    queryFn: async () => {
      const response: AxiosResponse<PropertyResponse> =
        await getPropertyService();
      return response.data.data
    },
  });
};
