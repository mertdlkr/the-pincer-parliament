"use client";

import { WagmiProvider as WProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmi-config";
import { useState, type ReactNode } from "react";

export function WagmiProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5000, // 5 seconds for Monad's fast blocks
                refetchInterval: 2000, // Frequent refetch for real-time updates
            },
        },
    }));

    return (
        <WProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WProvider>
    );
}
