import { appRouter } from "@/server/trpc/routers";

export const serverClient = appRouter.createCaller();
