"use client";
import { ChevronDown, DollarSign, WalletMinimal } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import PriceInputButton from "../PriceInputButton";
import { RouteResponse } from "fibrous-router-sdk";
import { Call } from "starknet";

import { ConnectWalletButton } from "../ConnectWalletButton";
import { TokenSelectDialog } from "./SwapTokenSelectModal";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";

import { getBestRoute, router } from "@/hooks/useFibrousSwap";
import { cn } from "@/lib/utils";
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { Token } from "fibrous-router-sdk";
import { useEffect, useState } from "react";
import { useSupportedTokens } from "@/hooks/useSupportedTokens";
import { useQuery } from "@tanstack/react-query";

import { useBalance } from "@starknet-react/core";

export type TokenPair = {
  tokenIn?: Token;
  tokenOut?: Token;
};

export function SwapCard() {
  const { send } = useSendTransaction({});
  const { address, status } = useAccount();
  async function swap(amount: string, tokenIn?: Token, tokenOut?: Token) {
    if (tokenIn == undefined || tokenOut == undefined) {
      return;
    }

    const tokenInAddress = tokenIn.address;
    const tokenOutAddress = tokenOut.address;
    const tokenInDecimals = tokenIn.decimals;
    const inputAmount = BigNumber.from(
      parseUnits(amount, Number(tokenInDecimals)),
    );

    if (status === "connected") {
      // Call the buildTransaction method in order to build the transaction
      // slippage: The maximum acceptable slippage of the buyAmount amount.
      const slippage = 1; // %1 slippage
      const receiverAddress = address!;

      const approveCall: Call = await router.buildApproveStarknet(
        inputAmount,
        tokenInAddress,
      );

      const swapCall: Call = await router.buildTransaction(
        inputAmount,
        tokenInAddress,
        tokenOutAddress,
        slippage,
        receiverAddress,
        "starknet",
      );
      send([approveCall]);
    }
  }

  const tokens = useSupportedTokens("starknet");

  const [tokenIn, setTokenIn] = useState<Token>();
  const [tokenOut, setTokenOut] = useState<Token>();

  const tokenInBalance = useBalance({
    token: tokenIn?.address,
  });
  const tokenOutBalance = useBalance({
    token: tokenOut?.address,
  });

  const [value, setValue] = useState("1");

  useEffect(() => {
    if (tokens && tokens["eth"] && tokens["usdc"]) {
      setTokenIn(tokens["eth"]);
      setTokenOut(tokens["usdc"]);
    }
  }, [tokens]);

  const query = useQuery({
    queryKey: ["tokenPairs", value, tokenIn, tokenOut],
    queryFn: async () => {
      return await getBestRoute(value, tokenIn, tokenOut);
    },
  });

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-6 bg-secondary/70 rounded-sm shadow-foreground/10 shadow-md max-w-2xl gap-3">
        <div className="flex justify-end">
          <div></div>
          <div>0.5%</div>
        </div>

        <div className="flex flex-col bg-card/60 shadow-foreground/10 shadow-md p-4 rounded-sm gap-4">
          <div className="flex justify-between gap-8">
            <div className="px-2">
              <PriceInputButton
                value={value}
                setValue={setValue}
                className="p-2 bg-secondary/20 shadow-foreground/15 shadow-sm font-bold text-xl"
              />
            </div>
            <TokenSelectDialog
              selectedToken={tokenIn}
              network="starknet"
              onSelect={(token: Token) => {
                setTokenIn(token);
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 justify-center items-center">
              <span className="text-lg flex items-center font-medium">
                $<span className="font-semibold">{tokenIn?.price * value}</span>
              </span>
            </div>
            <div className="flex gap-1 justify-center items-center">
              <WalletMinimal size={18} />
              <span className="text-lg flex items-center font-medium">
                <span className="font-semibold">
                  {tokenInBalance?.data?.value || "0"}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 text-white/80 text-md">
            <div className="cursor-pointer bg-primary/50 hover:bg-primary/70 shadow-sm shadow-foreground/20 rounded-sm text-center px-4">
              25%
            </div>

            <div className="cursor-pointer bg-primary/50 hover:bg-primary/70 shadow-sm shadow-foreground/20 rounded-sm text-center px-4">
              50%
            </div>

            <div className="cursor-pointer bg-primary/50 hover:bg-primary/70 shadow-sm shadow-foreground/20 rounded-sm text-center px-4">
              75%
            </div>

            <div className="cursor-pointer bg-primary/50 hover:bg-primary/70 shadow-sm shadow-foreground/20 rounded-sm text-center px-4">
              100%
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-card/60 shadow-foreground/10 shadow-md p-4 rounded-sm gap-4">
          <div className="flex justify-between gap-8">
            <div className="px-2">
              <PriceInputButton
                value={
                  query?.data?.outputAmount /
                  10 ** query?.data?.outputToken?.decimals
                }
                readOnly
                className="p-2 bg-secondary/20 shadow-foreground/15 shadow-sm font-bold text-xl"
              />
            </div>
            <TokenSelectDialog
              selectedToken={tokenOut}
              network="starknet"
              onSelect={(token: Token) => {
                setTokenOut(token);
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 justify-center items-center">
              <span className="text-lg flex items-center font-medium">
                $
                <span className="text-md font-semibold">
                  {(query?.data?.outputAmount /
                    10 ** query?.data?.outputToken?.decimals) *
                    query?.data?.outputToken.price}
                </span>
              </span>
            </div>
            <div className="flex gap-1 justify-center items-center">
              <WalletMinimal size={18} />
              <span className="text-lg flex items-center font-medium">
                <span className="font-semibold">
                  {tokenOutBalance?.data?.value || "0"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className=""></div>
          <div className=""></div>
        </div>

        <div className="flex w-full">
          {status === "connected" ? (
            <div
              onClick={() => swap(value, tokenIn, tokenOut)}
              className={cn(
                "text-white flex flex-grow justify-center p-3 rounded-lg text-xl items-center bg-primary/80 cursor-pointer hover:bg-primary",
              )}
            >
              Swap
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
    </div>
  );
}
