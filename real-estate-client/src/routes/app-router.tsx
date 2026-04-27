import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public-routes";
import { protectedRoutes } from "./protected-routes";
import { AdminLogin, AdminDashboard } from "@/modules/admin-modules";
import { AdminGuard } from "@/guard/admin.guard";

const appRouter = createBrowserRouter([...publicRoutes, ...protectedRoutes,{
  path: "/admin/login",
  element: <AdminLogin />,
}, {
  path: "/admin/dashboard",
  element: (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  ),
}, {
    path: "*",
    element: <div className="h-screen flex items-center justify-center text-2xl font-bold text-red-500">404 - Page Not Found</div>
}]);

export default appRouter;
