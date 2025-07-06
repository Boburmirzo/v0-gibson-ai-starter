"use client"

import type React from "react"
import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { trpc } from "@/client/trpc"
import { httpBatchLink } from "@trpc/client"
import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
