"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "../_trpc/TRPCProvider";
import { useSidebarToogle } from "@/store/sidebarToogle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, setIsOpen } = useSidebarToogle();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex">
          <Provider>
            <Sidebar />
            <div className="flex flex-grow justify-center">
              <div className="2xl:max-w-5xl xl:max-w-4xl lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-lg flex flex-col flex-grow">
                <Topbar />
                {children}
              </div>
            </div>
            <Toaster />
          </Provider>
        </body>
      </html>
    </>
  );
}
