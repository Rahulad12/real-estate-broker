import { requireAuth } from "@/guard/authLoader";
import Layout from "@/modules/broker-dashboard-modules/component/layout";
import BuyerDashboard from "@/modules/broker-dashboard-modules/page/buyer";
import Favorite from "@/modules/broker-dashboard-modules/page/favorite";
import ProfilePage from "@/modules/profile-modules/page";
import { PropertyDetailsPage } from "@/modules/property-details-modules";

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
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetailsPage />,
      },
    ],
  },
];

