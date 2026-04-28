import {
  CreateUserValidation,
  LoginValidation,
  UpdateEmailValidation,
  UpdatePasswordValidation,
} from './user.validation';
import z from 'zod';

export interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
}

export type UserRole = 'admin' | 'user' | 'broker';

export interface User {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export type CreateUserPayload = z.infer<typeof CreateUserValidation>;
export type AuthUserPayload = z.infer<typeof LoginValidation>;
export type UpdateEmailPayload = z.infer<typeof UpdateEmailValidation>;
export type UpdatePasswordPayload = z.infer<typeof UpdatePasswordValidation>;
