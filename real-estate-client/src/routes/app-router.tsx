import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public-routes";
import { protectedRoutes } from "./protected-routes";

const appRouter = createBrowserRouter([...publicRoutes, ...protectedRoutes,{
    path: "*",
    element: <div className="h-screen flex items-center justify-center text-2xl font-bold text-red-500">404 - Page Not Found</div>
}]);

export default appRouter;
