import { z } from "zod";
import { publicProcedure, router } from "../trpc";

import ky from "ky";

export type CoinData = {
  id: string;
  symbol: string;
  image: string;
  price: number;
  hour1: number;
  hour24: number;
  day7: number;
  day30: number;
  marketcap: number;
  isfavorite?: boolean;
};

export type TokenBalance = {
  symbol: string;
  balance: number;
  price: number;
  valueInUSD: string;
};

export type Token = {
  symbol: string;
  holdingAmount: string;
  tokenContractAddress: string;
};

export type TokenData = {
  page: string;
  limit: string;
  totalPage: string;
  tokenList: Token[];
};

export type ResponseTokenData = {
  code: string;
  msg: string;
  data: TokenData;
};

export async function getCoinData(): Promise<CoinData[] | null> {
  try {
    const result = await ky
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        searchParams: {
          vs_currency: "usd",
          price_change_percentage: "1h,24h,7d,30d",
        },
      })
      .json<any[]>();

    const data: CoinData[] = result?.map((data: any) => ({
      id: data.id,
      symbol: data.symbol,
      image: data.image,
      price: data.current_price,
      hour1: data.price_change_percentage_1h_in_currency || 0,
      hour24: data.price_change_percentage_24h_in_currency || 0,
      day7: data.price_change_percentage_7d_in_currency || 0,
      day30: data.price_change_percentage_30d_in_currency || 0,
      marketcap: data.market_cap,
      isfavorite: false,
    }));

    return data;
  } catch (err) {
    console.error("Error fetching coin data:", err);
    return null;
  }
}

export const getUserBalance = async (user: string): Promise<Token[] | null> => {
  try {
    const result = await ky
      .get(
        `https://www.oklink.com/api/v5/explorer/address/token-balance-starknet`,
        {
          searchParams: {
            address: user,
            chainShortName: "starknet",
            protocolType: "token_20",
            limit: "50",
          },
          headers: {
            "OK-ACCESS-KEY": "745a3773-0209-4516-884a-e3db774c896b",
            "Content-Type": "application/json",
          },
        },
      )
      .json<ResponseTokenData>();

    console.log(result.data.tokenList);

    return result.data.tokenList;
  } catch (error: any) {
    console.error(
      "Error fetching user balance from OKLink API:",
      error.message,
    );
    return null;
  }
};

export const getPortfolio = async (user: string) => {
  try {
    const tokens = await getUserBalance(user);
    if (!tokens) throw new Error("Failed to fetch user tokens");

    const prices = await getCoinData();
    if (!prices || prices.length === 0)
      throw new Error("Failed to fetch coin prices or no prices available");

    let totalValue = 0;

    const tokenData = tokens.map((token: Token) => {
      const tokenInfo = prices.find(
        (price: CoinData) =>
          price.symbol.toLowerCase() === token.symbol.toLowerCase(),
      );

      const balance = Number(token.holdingAmount);
      const price = tokenInfo ? tokenInfo.price : 0;
      totalValue += price * balance;

      return {
        image: tokenInfo?.image,
        name: tokenInfo?.id,
        symbol: token.symbol,
        balance: balance,
        price: price,
        value: price * balance,
        day7: tokenInfo?.day7 || null,
        hour24: tokenInfo?.hour24 || null,
        hour1: tokenInfo?.hour1 || null,
      };
    });

    const portfolioData = {
      tokenData,
      totalValue,
    };

    console.log(portfolioData);
    return portfolioData;
  } catch (err) {
    console.error("Error calculating token balances in USD:", err);
    throw err;
  }
};

export const portfolioRouter = router({
  getPortfolioData: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const res = await getPortfolio(input.address);
      return res;
    }),
});
