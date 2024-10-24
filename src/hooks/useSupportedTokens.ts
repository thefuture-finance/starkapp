import { useQuery } from "@tanstack/react-query";
import { Router as FibrousRouter } from "fibrous-router-sdk";
import { useEffect, useState } from "react";

const router = new FibrousRouter();

export type Networks = "starknet" | "scroll";

function useSupportedTokens(network: Networks) {
  const query = useQuery({
    queryKey: ["tokens", network],
    queryFn: async () => {
      return await router.supportedTokens(network);
    },
  });

  return query.data;
}

export { useSupportedTokens };
