"use client";
import { ChevronDown, WalletMinimal } from "lucide-react";
import { PortfolioData } from "./types";
import { trpc } from "@/app/_trpc/client";
import { extractParts } from "@/utils/formatters";
import { Skeleton } from "../ui/skeleton";

export function PortfolioInfo({
  initialData,
  address,
}: {
  initialData?: PortfolioData;
  address: string;
}) {
  const portfolioData = trpc.portfolioRouter.getPortfolioData.useQuery(
    {
      address,
    },
    { initialData },
  );

  console.log(portfolioData.data);

  return (
    <div className="flex h-[200px] items-center gap-5">
      <div className="flex">
        <div className="flex w-24 aspect-square rounded-full bg-primary justify-center items-center">
          <WalletMinimal size={48} strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 justify-start items-center">
          <span>{extractParts(address, 6, 4)}</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </div>
        <div className="flex">
          {portfolioData.isFetching && initialData == null ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <span>${portfolioData?.data?.totalValue}</span>
          )}
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
}
