"use client";
import {
  Instagram,
  MapPin,
  MapPinCheckInside,
  MapPinMinusInside,
  MapPinPlusInside,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePinnedAppsStore } from "@/store/pinnedApps";

export type DappLink = {
  name: string;
  link: string;
};

export type DappCardProps = {
  logo: string;
  title: string;
  description: string;
  links: DappLink[];
  badges: string[];
  target: string;
};

export function DappCard({ cardProps }: { cardProps: DappCardProps }) {
  const pinStore = usePinnedAppsStore();
  return (
    <div className="relative mt-8">
      <Link href={`/dapp?url=${cardProps.target}`}>
        <div className="relative flex aspect-square bg-muted/60 hover:bg-muted/90 cursor-pointer rounded-lg">
          <div className="flex flex-col flex-grow justify-between h-full p-7 pr-14 ">
            <div className="flex flex-col justify-start gap-3">
              <div className="">
                <Image
                  className="rounded-full"
                  width={48}
                  height={48}
                  alt="logo"
                  src={cardProps.logo}
                />
              </div>
              <div className="text-[20px] font-bold text-foreground">
                {cardProps.title}
              </div>
              <div className="text-[16px] text-foreground line-clamp-4">
                {cardProps.description}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-white/80 text-[14px]">
              {cardProps.badges.map((badge, i) => (
                <div key={i} className="px-3 bg-primary/70 rounded-full">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute z-10 py-1 flex right-0 bottom-0 flex-col items-center justify-end text-muted-foreground">
          {cardProps.links.map((link, i) => (
            <a
              key={i}
              href={`${link.link}`}
              className="hover:text-foreground p-2"
            >
              <Instagram />
            </a>
          ))}
        </div>
      </Link>
      <div
        onClick={(event) => event.stopPropagation()}
        className="group hover:text-foreground absolute z-20 py-1 flex right-2 top-2 flex-col items-center justify-end text-muted-foreground cursor-pointer"
      >
        {pinStore.pinnedAppIds.includes(cardProps.title) ? (
          <>
            <MapPinCheckInside className="group-hover:hidden flex text-black" />
            <MapPinMinusInside
              className="group-hover:flex hidden"
              onClick={() => pinStore.removePinnedApp(cardProps.title)}
            />
          </>
        ) : (
          <>
            <MapPin className="group-hover:hidden flex" />
            <MapPinPlusInside
              className="group-hover:flex hidden"
              onClick={() => pinStore.addPinnedApp(cardProps.title)}
            />
          </>
        )}
      </div>
    </div>
  );
}
