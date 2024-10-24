import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DappCard, DappCardProps } from "../Dapps";

const cards: DappCardProps[] = [
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },

  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
  {
    logo: "/assets/images/starkLogo.png",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: ["https://instagram.com/asd", "https://x/asd"],
    badges: ["Defi", "AMM", "Games"],
    target: "https://app.aave.com",
  },
];

export function HomeCardSlider() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {cards.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <DappCard cardProps={card} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
