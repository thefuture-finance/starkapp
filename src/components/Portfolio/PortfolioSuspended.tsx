import { serverClient } from "@/app/_trpc/serverClient";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioBody } from "./PortfolioBody";

export async function PortfolioSuspended({ address }: { address: string }) {
  const initialData = undefined;
  return (
    <div className="flex flex-col">
      <PortfolioHeader address={address} initialData={initialData} />
      <PortfolioBody address={address} initialData={initialData} />
    </div>
  );
}
