import {  redirect } from "react-router";
import { authService } from "@/apis/auth";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuth = authService.isAuthenticated();
  if (isAuth) throw redirect("/dashboard");
  return <>{children}</>;
};
