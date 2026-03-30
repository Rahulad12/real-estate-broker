import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        retryDelay: 1000,
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

export default ReactQueryProvider;
