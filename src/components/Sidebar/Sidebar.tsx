"use client";
import {
  ArrowLeftRight,
  ArrowLeftToLine,
  ArrowRightToLine,
  ChartCandlestick,
  House,
  LayoutDashboard,
  Settings,
  Waypoints,
} from "lucide-react";
import { SidebarElement } from "./SidebarElement";
import { cn } from "@/lib/utils";
import { useSidebarToogle } from "@/store/sidebarToogle";
import { CommunityCard } from "./CommunityCard";
import { DynamicWalletButton } from "../Wallet/WalletButton";

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarToogle();

  return (
    <div
      className={cn(
        "sticky top-0 h-[100vh] border-r border-border justify-between flex flex-col gap-1 px-3 pt-6",
        isOpen ? "w-64" : "",
      )}
    >
      <div>
        <DynamicWalletButton />
        <div className="flex flex-col items-start">
          <SidebarElement href="/">
            <House size={20} strokeWidth={1.5} />
            {isOpen && <span>Home</span>}
          </SidebarElement>
          {/* <SidebarElement href="explore"> */}
          {/*   <ChartCandlestick size={20} strokeWidth={1.5} /> */}
          {/*   {isOpen && <span>Explore</span>} */}
          {/* </SidebarElement> */}
          <SidebarElement href="portfolio">
            <ChartCandlestick size={20} strokeWidth={1.5} />
            {isOpen && <span>Portfolio</span>}
          </SidebarElement>
          <SidebarElement href="swap">
            <ArrowLeftRight size={20} strokeWidth={1.5} />
            {isOpen && <span>Swap</span>}
          </SidebarElement>
          <SidebarElement href="https://starkgate.starknet.io/" target="_blank">
            <Waypoints size={20} strokeWidth={1.5} />
            {isOpen && <span>Bridge</span>}
          </SidebarElement>
          <SidebarElement href="dapps">
            <LayoutDashboard size={20} strokeWidth={1.5} />
            {isOpen && <span>Dapps</span>}
          </SidebarElement>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <CommunityCard />
        </div>
        <div className="flex gap-2 text-muted-foreground p-3 cursor-not-allowed">
          <Settings size={20} strokeWidth={1.5} />
          {isOpen && <span>Settings</span>}
        </div>
      </div>
      <div
        className="absolute bg-card p-2 border-border border-b border-r top-0 right-[-42px] text-muted-foreground hover:text-foreground cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <ArrowLeftToLine /> : <ArrowRightToLine />}
      </div>
    </div>
  );
}
