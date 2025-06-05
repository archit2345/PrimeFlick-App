import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Query client: core object that stores cache, tracks queries, mutations, etc.

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools removed for production */}
    </QueryClientProvider>
  );
};
