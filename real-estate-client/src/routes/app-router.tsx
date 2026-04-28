import { createBrowserRouter, Navigate } from "react-router";
import { publicRoutes } from "./public-routes";
import { protectedRoutes } from "./protected-routes";
import AdminLogin from "@/modules/admin-modules/page/admin-login";
import DashboardIndex from "@/modules/admin-modules/page/dashboard/index";
import { UserList } from "@/modules/admin-modules/page/users/user-list";
import { UserDashboard } from "@/modules/admin-modules/page/users/user-dashboard";
import { PropertyList } from "@/modules/admin-modules/page/properties/property-list";
import { PropertyDashboard } from "@/modules/admin-modules/page/properties/property-dashboard";
import { SchedulingList } from "@/modules/admin-modules/page/scheduling/scheduling-list";
import { SchedulingDashboard } from "@/modules/admin-modules/page/scheduling/scheduling-dashboard";
import { AdminLayout } from "@/modules/admin-modules/component/admin-layout";
import { AdminGuard } from "@/guard/admin.guard";

const appRouter = createBrowserRouter([...publicRoutes, ...protectedRoutes, {
  path: "/admin/login",
  element: <AdminLogin />,
}, {
  path: "/admin",
  element: (
    <AdminGuard>
      <AdminLayout />
    </AdminGuard>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/admin/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <DashboardIndex />,
    },
    {
      path: "users",
      children: [
        { index: true, element: <Navigate to="list" replace /> },
        { path: "list", element: <UserList /> },
        { path: "stats", element: <UserDashboard /> },
      ]
    },
    {
      path: "properties",
      children: [
        { index: true, element: <Navigate to="list" replace /> },
        { path: "list", element: <PropertyList /> },
        { path: "stats", element: <PropertyDashboard /> },
      ]
    },
    {
      path: "scheduling",
      children: [
        { index: true, element: <Navigate to="list" replace /> },
        { path: "list", element: <SchedulingList /> },
        { path: "stats", element: <SchedulingDashboard /> },
      ]
    }
  ]
}, {
  path: "*",
  element: <div className="h-screen flex items-center justify-center text-2xl font-bold text-red-500">404 - Page Not Found</div>
}]);

export default appRouter;
