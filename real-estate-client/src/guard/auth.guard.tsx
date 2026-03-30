import {  redirect } from "react-router";
import { authService } from "@/apis/auth";

export const AuthGuard = () => {
  const isAuth = authService.isAuthenticated();
  if (isAuth) throw redirect("/dashboard");
  return null;
};
