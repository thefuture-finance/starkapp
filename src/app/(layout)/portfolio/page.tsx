import { PortfolioBody, PortfolioHeader } from "@/components/Portfolio";
import { PortfolioSuspended } from "@/components/Portfolio/PortfolioSuspended";

export default function Portfolio({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <PortfolioSuspended address={searchParams.address || ""} />;
}
