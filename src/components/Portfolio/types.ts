import { serverClient } from "@/app/_trpc/serverClient";

export type PortfolioData = Awaited<
  ReturnType<(typeof serverClient)["portfolioRouter"]["getPortfolioData"]>
>;
