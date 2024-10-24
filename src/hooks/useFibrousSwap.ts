import { Router as FibrousRouter, Token } from "fibrous-router-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";
import { useAccount, useConnect } from "@starknet-react/core";
import { Call } from "starknet";
import { useSupportedTokens } from "./useSupportedTokens";

export const router = new FibrousRouter();

export async function getBestRoute(
  amount?: string,
  tokenIn?: Token,
  tokenOut?: Token,
) {
  try {
    if (amount == undefined || tokenIn == undefined || tokenOut == undefined) {
      throw "undefined";
    }
    const tokenInAddress = tokenIn.address;
    const tokenOutAddress = tokenOut.address;
    const tokenInDecimals = tokenIn.decimals;
    const inputAmount = BigNumber.from(
      parseUnits(amount, Number(tokenInDecimals)),
    );

    const route = await router.getBestRoute(
      inputAmount, // amount
      tokenInAddress, // token input
      tokenOutAddress, // token output
      "starknet", // chain name (Starknet or Scroll)
    );

    if (!route.success) {
      throw route.errorMessage;
    }

    return route;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function useFibrousSwap() {
  return {
    getBestRoute,
  };
}
