import type { LoginPayload, RegisterPayload } from "@/modules/auth-modules/types";
import axiosInstance from "../axiosInstance";

export const loginUser = (payload: LoginPayload) => {
  return axiosInstance.post("/auth/login", payload,{
    skipAuthRefresh: true
  });
};

export const registerUser = (payload: RegisterPayload) =>{
    return axiosInstance.post("/auth/register",payload,{
      skipAuthRefresh: true
    })
}