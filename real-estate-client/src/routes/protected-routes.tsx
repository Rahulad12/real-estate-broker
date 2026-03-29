import { requireAuth } from "@/guard/authLoader";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
    loader: requireAuth,
  },
];
