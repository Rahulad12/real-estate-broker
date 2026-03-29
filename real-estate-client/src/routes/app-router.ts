import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public-routes";
import { protectedRoutes } from "./protected-routes";

const appRouter = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default appRouter;
