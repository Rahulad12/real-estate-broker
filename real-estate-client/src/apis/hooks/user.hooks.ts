import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import { getUserDetailsById, updateEmail, updatePassword } from "../services/user.service";
import type { GetUserByIdResponse } from "@/modules/broker-dashboard-modules/types/user.types";
import { toast } from "sonner";
import type { UpdateEmailPayload, UpdatePasswordPayload } from "@/modules/profile-modules/types/profile.types";

export const useGetUserDetailsById = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const res: AxiosResponse<GetUserByIdResponse> = await getUserDetailsById();
      return res.data;
    },
  });
};

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateEmailPayload) => updateEmail(data),
    onSuccess: () => {
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update email");
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordPayload) => updatePassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update password");
    },
  });
};


