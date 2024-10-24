"use client";
import { useAccount } from "@starknet-react/core";
import { PortfolioInfo, PortfolioPieChart } from "./index";
import { PortfolioData } from "./types";

export function PortfolioHeader({
  initialData,
  address,
}: {
  initialData?: PortfolioData;
  address: string;
}) {
  const account = useAccount();
  return (
    <div className="flex justify-between py-8">
      <div>
        <PortfolioInfo
          initialData={initialData}
          address={address || account.address || ""}
        />
      </div>
      <div>
        <PortfolioPieChart
          initialData={initialData}
          address={address || account.address || ""}
        />
      </div>
    </div>
  );
}
