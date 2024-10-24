import { mainnet, sepolia } from "@starknet-react/chains";
import {
  type Connector,
  StarknetConfig,
  publicProvider,
  useAccount,
  useConnect,
} from "@starknet-react/core";
import { useState } from "react";
import {
  type StarknetkitConnector,
  useStarknetkitConnectModal,
} from "starknetkit";
import { availableConnectors } from "./starknet-connectors";
import { Button } from "../ui/button";
import { WalletMinimal } from "lucide-react";
import { useSidebarToogle } from "@/store/sidebarToogle";
import { cn } from "@/lib/utils";
import { extractParts } from "@/utils/formatters";
import { useBalance } from "@starknet-react/core";

export function WalletButton({ sidebar }: { sidebar?: boolean }) {
  const { isOpen, setIsOpen } = useSidebarToogle();
  const { data, error } = useBalance({});
  const { isHide } = useHideBalance();

  const { connectAsync, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: availableConnectors as StarknetkitConnector[],
  });

  const { address, chainId, account } = useAccount();

  // function to connect to a wallet via starknetkit modal
  async function connectWalletWithModal() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connectAsync({ connector: connector as Connector });
  }

  // function to connect to a wallet via starknetkit connector
  async function connectWalletWithConnector(connector: Connector) {
    await connectAsync({ connector });
  }

  return (
    <div onClick={connectWalletWithModal}>
      <div
        className={cn(
          "text-white flex gap-4 items-center bg-primary/80 cursor-pointer hover:bg-primary",
          isOpen ? "rounded-full p-2 px-3" : "rounded-sm p-3",
        )}
      >
        {isOpen ? (
          address ? (
            <div className="text-[16px] w-full h-full flex flex-col justify-center">
              <pre>{`${isHide ? "**" : data?.value || 0} ETH | ${extractParts(address, 6, 4)}`}</pre>
            </div>
          ) : (
            <>
              <WalletMinimal size={20} />
              Connect Wallet
            </>
          )
        ) : (
          <WalletMinimal size={20} />
        )}
      </div>
    </div>
  );
}

import dynamic from "next/dynamic";
import { useHideBalance } from "@/store/hideBalance";

export const DynamicWalletButton = dynamic(
  () => Promise.resolve(WalletButton),
  {
    ssr: true,
  },
);
