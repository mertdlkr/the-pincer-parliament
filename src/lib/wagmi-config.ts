import { http, createConfig } from "wagmi";
import { monadTestnet } from "viem/chains";
import { injected, walletConnect } from "wagmi/connectors";

// WalletConnect Project ID (replace with your own)
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";

export const wagmiConfig = createConfig({
    chains: [monadTestnet],
    connectors: [
        injected(),
        walletConnect({ projectId: WALLETCONNECT_PROJECT_ID }),
    ],
    transports: {
        [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
    },
    ssr: true,
});

// Contract Addresses (update after deployment)
export const CONTRACT_ADDRESSES = {
    pincerGov: process.env.NEXT_PUBLIC_PINCER_GOV_ADDRESS || "0x0000000000000000000000000000000000000000",
    moltRegistry: process.env.NEXT_PUBLIC_MOLT_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000",
} as const;

// Chain info
export const MONAD_TESTNET = {
    id: 10143,
    name: "Monad Testnet",
    network: "monad-testnet",
    nativeCurrency: {
        name: "MON",
        symbol: "MON",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://testnet-rpc.monad.xyz"] },
        public: { http: ["https://testnet-rpc.monad.xyz"] },
    },
    blockExplorers: {
        default: { name: "Monad Explorer", url: "https://testnet.monadexplorer.com" },
        socialscan: { name: "Socialscan", url: "https://monad-testnet.socialscan.io" },
        monadvision: { name: "MonadVision", url: "https://testnet.monadvision.com" },
        monadscan: { name: "Monadscan", url: "https://testnet.monadscan.com" },
    },
} as const;
