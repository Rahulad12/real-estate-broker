import { Navigate } from "react-router";
import { authService } from "@/apis/auth";
import type { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

/**
 * Guard component to protect admin-only routes
 * Redirects to /admin/login if not authenticated or not admin
 */
export const AdminGuard = ({ children }: AdminGuardProps) => {
  const isAuth = authService.isAuthenticated();
  const userRole = localStorage.getItem("user_role"); // Assuming role is stored

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  if (userRole !== "admin") {
    // Redirect to home if authenticated but not admin
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
