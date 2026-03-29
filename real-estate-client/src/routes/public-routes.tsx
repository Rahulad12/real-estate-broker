import { AuthGuard } from "@/guard/auth.guard";
import { Login, Register } from "@/modules/auth-modules";

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
    loader: AuthGuard,
  },
  {
    path: "/register",
    element: <Register />,
    loader: AuthGuard,
  },
];
