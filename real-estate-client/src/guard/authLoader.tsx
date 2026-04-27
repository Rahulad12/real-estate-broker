import { redirect, type LoaderFunctionArgs } from "react-router";
import { authService } from "@/apis/auth";

export const requireAuth = ({ request }: LoaderFunctionArgs) => {
  const isAuth = authService.isAuthenticated();
  if (!isAuth) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    throw redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }
  return null;
};
