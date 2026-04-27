import { AuthGuard } from "@/guard/auth.guard";
import { Login, Register } from "@/modules/auth-modules";
import LandingPage from "@/modules/landing-modules/page";
import BrowseProperties from "@/modules/browse-properties-modules/page";

export const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
    loader: AuthGuard,
  },
  {
    path: "/login",
    element: <Login />,
    loader: AuthGuard,
  },
  {
    path: "/register",
    element: <Register />,
    loader: AuthGuard,
  },
  {
    path: "/browse",
    element: <BrowseProperties />,
  },
];
