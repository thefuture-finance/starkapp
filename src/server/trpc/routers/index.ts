import { router } from "../trpc";
import { portfolioRouter } from "./portfolio";

export const appRouter = router({
  portfolioRouter: portfolioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
