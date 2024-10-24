"use client";
import localFont from "next/font/local";
import "@/app/globals.css";

import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useSidebarToogle } from "@/store/sidebarToogle";
import { useEffect } from "react";

import { Provider } from "../_trpc/TRPCProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsOpen } = useSidebarToogle();
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex">
          <Provider>
            <Sidebar />
            <div className="flex flex-grow justify-center">{children}</div>
          </Provider>
        </body>
      </html>
    </>
  );
}
