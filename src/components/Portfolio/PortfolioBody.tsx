"use client";
import { useAccount } from "@starknet-react/core";
import PortfolioTable from "./PortfolioTable";
import { PortfolioData } from "./types";

export function PortfolioBody({
  initialData,
  address,
}: {
  initialData?: PortfolioData;
  address: string;
}) {
  const account = useAccount();
  return (
    <div className="flex items-center gap-5">
      <PortfolioTable address={address || account.address || ""} />
    </div>
  );
}
