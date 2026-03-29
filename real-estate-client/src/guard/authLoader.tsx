import { redirect } from "react-router";
import { authService } from "@/apis/auth";

export const requireAuth = () => {
  const isAuth = authService.isAuthenticated();
  if (!isAuth) throw redirect("/");
  return null;
};
