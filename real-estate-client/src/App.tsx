import ReactQueryProvider from "./providers/react-query-provider";
import appRouter from "./routes/app-router";
import { RouterProvider } from "react-router";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={appRouter} />
    </ReactQueryProvider>
  );
}

export default App;
