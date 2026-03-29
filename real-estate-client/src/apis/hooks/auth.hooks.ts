import type {
  LoginApiResponse,
  LoginPayload,
  RegisterApiResponse,
  RegisterPayload,
} from "@/modules/auth-modules/types";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/auth-services";
import type { AxiosResponse } from "axios";
import { authService } from "../auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginPaylaod: LoginPayload) => {
      const response: AxiosResponse<LoginApiResponse> =
        await loginUser(loginPaylaod);
      return response.data;
    },
    onSuccess(data: LoginApiResponse) {
      authService.setAccessToken(data?.data?.token);
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
      console.log("Register successfull", data);
    },
  });
};
