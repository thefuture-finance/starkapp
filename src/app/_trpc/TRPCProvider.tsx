"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { ThemeProvider } from "@/context/ThemeProvider";
import { trpc } from "./client";
import { StarknetProvider } from "@/context/StarknetProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  const token = "";
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "api/trpc",
          headers() {
            return {
              Authorization: token,
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StarknetProvider>{children}</StarknetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
