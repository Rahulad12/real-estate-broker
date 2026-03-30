import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./providers/react-query-provider";
import { RouterProvider } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import appRouter from "./routes/app-router";

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
