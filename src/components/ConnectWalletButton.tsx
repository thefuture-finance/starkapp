"use client";
import { cn } from "@/lib/utils";
import { useConnect } from "@starknet-react/core";
import WalletBar from "./WalletBar";

export function ConnectWalletButton() {
  const { connect, error } = useConnect({});

  return (
    <div
      onClick={() => connect()}
      className={cn(
        "text-white flex flex-grow justify-center p-3 rounded-lg text-xl items-center bg-primary/80 cursor-pointer hover:bg-primary",
      )}
    >
      Connect
    </div>
  );
}
