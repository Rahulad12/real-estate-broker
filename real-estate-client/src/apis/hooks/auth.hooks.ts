import type {
  LoginApiResponse,
  LoginPayload,
  RegisterApiResponse,
  RegisterPayload,
} from "@/modules/auth-modules/types";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/auth.services";
import type { AxiosError, AxiosResponse } from "axios";
import { authService } from "../auth";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginPaylaod: LoginPayload) => {
      const response: AxiosResponse<LoginApiResponse> =
        await loginUser(loginPaylaod);
      return response.data;
    },
    onSuccess(data: LoginApiResponse) {
      authService.setAccessToken(data?.data?.accessToken);
      authService.setRefreshToken(data?.data?.refreshToken);
      // Store user email for admin guard
      const userRole:string = data.data.user;
      if (userRole) {
        localStorage.setItem("user_role", userRole);
      }
      toast.success(data?.message);
    },
    onError(error: AxiosError<{ message: string }>) {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (registerPayload: RegisterPayload) => {
      const response: AxiosResponse<RegisterApiResponse> =
        await registerUser(registerPayload);
      return response.data;
    },
    onSuccess(data: RegisterApiResponse) {
      toast.success(data?.message);
    },
    onError(error:AxiosError<{ message: string }>) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  });
};
