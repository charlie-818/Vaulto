import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

// Replace YOUR_WALLETCONNECT_PROJECT_ID with your WalletConnect Cloud project ID from https://cloud.walletconnect.com
export const config = getDefaultConfig({
  appName: "Vaulto",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [mainnet],
  ssr: true,
});
