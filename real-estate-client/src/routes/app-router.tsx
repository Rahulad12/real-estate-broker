import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public-routes";
import { protectedRoutes } from "./protected-routes";
import AdminLogin from "@/modules/admin-modules/page/admin-login";
import AdminDashboard from "@/modules/admin-modules/page/admin-dashboard";
import AdminUsers from "@/modules/admin-modules/page/admin-users";
import AdminProperties from "@/modules/admin-modules/page/admin-properties";
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
  path: "/admin/users",
  element: (
    <AdminGuard>
      <AdminUsers />
    </AdminGuard>
  ),
}, {
  path: "/admin/properties",
  element: (
    <AdminGuard>
      <AdminProperties />
    </AdminGuard>
  ),
}, {
    path: "*",
    element: <div className="h-screen flex items-center justify-center text-2xl font-bold text-red-500">404 - Page Not Found</div>
}]);

export default appRouter;
