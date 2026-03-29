import {  useQuery } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { getUserDetailsById } from "../services/user.service";
import type { GetUserByIdResponse } from "@/modules/broker-dashboard-modules/types/user.types";

export const useGetUserDetailsById = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const res: AxiosResponse<GetUserByIdResponse> = await getUserDetailsById();
      return res.data;
    },
  });
};
