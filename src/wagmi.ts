import {w3mConnectors, w3mProvider} from "@web3modal/ethereum";
import {configureChains, createClient} from "wagmi";
import {goerli, arbitrumGoerli, arbitrum} from "wagmi/chains";

export const walletConnectProjectId = "f5615090709814bc49c09fd9aa02860d";

const {chains, provider, webSocketProvider} = configureChains(
    [goerli, arbitrum, ...(process.env.NODE_ENV === "development" ? [arbitrumGoerli] : [])],
    [w3mProvider({projectId: walletConnectProjectId})]
);

export const client = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
        chains,
        projectId: walletConnectProjectId,
        version: 1,
    }),
    provider,
    webSocketProvider,
});

export {chains};
