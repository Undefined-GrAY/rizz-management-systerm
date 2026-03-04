import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchInterval: 30 * 1000,
      refetchOnWindowFocus: true, 
      retry:false 
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          className:
            "!bg-white dark:!bg-slate-900 !text-slate-700 dark:!text-slate-200 !border !border-slate-200 dark:!border-slate-900 !shadow-lg !p-4 !text-base !max-w-[500px]",
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
