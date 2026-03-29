import { Navigate } from "react-router";
import { authService } from "@/apis/auth";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuth = authService.isAuthenticated();
  if (isAuth) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
