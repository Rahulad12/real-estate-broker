export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface GetUserByIdResponse {
  success: boolean;
  data: User;
  message: string;
}

