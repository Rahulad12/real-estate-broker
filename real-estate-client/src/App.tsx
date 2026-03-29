import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./providers/react-query-provider";
import appRouter from "./routes/app-router";
import { RouterProvider } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <RouterProvider router={appRouter} />
        <Toaster position="bottom-right" richColors duration={2000} />
      </TooltipProvider>
    </ReactQueryProvider>
  );
}

export default App;
