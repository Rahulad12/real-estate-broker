import type z from "zod";
import { CreateUserValidation, LoginValidation } from "../validation-schema/user.validation";

export type LoginPayload = z.infer<typeof LoginValidation>;
export interface LoginApiResponse {
  success: boolean;
  data: {
    token: string;
    user: string;
  };
  message:string;
}

//register
export type RegisterPayload = z.infer<typeof CreateUserValidation>;
export interface RegisterApiResponse {
  success: boolean;
  message:string;
}

