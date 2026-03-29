import { requireAuth } from "@/guard/authLoader";
import Layout from "@/modules/broker-dashboard-modules/component/layout";
import BuyerDashboard from "@/modules/broker-dashboard-modules/page/buyer";
import Favorite from "@/modules/broker-dashboard-modules/page/favorite";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Layout />,
    loader: requireAuth,
    children: [
      {
        index: true,
        element: <BuyerDashboard />,
      },
      {
        path: "saved",
        element: <Favorite />,
      },
    ],
  },
];
