"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { isSmaller, roundNumber, roundPrice } from "@/utils/formatters";
import { Skeleton } from "../ui/skeleton";

import Image from "next/image";
import { zeroFormatterHtml } from "@/app/_utils/htmlFormatters";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { PortfolioData } from "./types";

export const columns: ColumnDef<PortfolioData[number], any>[] = [
  {
    accessorKey: "image",
    header: () => {
      return null;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full aspect-square flex justify-center items-center mr-[-16px]">
          <Image
            width={32}
            height={32}
            alt="scroll"
            src={row.getValue("image")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("name")}</div>;
    },
  },

  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("balance"))}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" font-medium">{roundPrice(row.getValue("value"))}</div>
    ),
  },
  {
    accessorKey: "hour1",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hour24",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export default function PortfolioTable({
  initialData,
  address,
}: {
  initialData?: PortfolioData;
  address: string;
}) {
  console.log(address);
  const portfolioData = trpc.portfolioRouter.getPortfolioData.useQuery(
    {
      address,
    },
    { initialData },
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: portfolioData.data?.tokenData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col grow">
      <div className="flex flex-col gap-4">
        <div className="p-3 flex justify-between text-xl cursor-pointer bg-muted/60 hover:bg-muted/90 text-foreground rounded-xl shadow-sm shadow-foreground/20">
          <div className="basis-1/2 flex flex-col gap-2">
            <div className="basis-1/2">
              <Button
                onClick={() =>
                  table
                    .getColumn("value")
                    ?.toggleSorting(
                      table.getColumn("value")?.getIsSorted() === "asc",
                    )
                }
              >
                USD
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="basis-1/2 flex justify-end items-center">
            <div className="w-[500px] flex gap-1 items-center">
              <div className="flex basis-1/4">
                <Button
                  onClick={() =>
                    table
                      .getColumn("balance")
                      ?.toggleSorting(
                        table.getColumn("balance")?.getIsSorted() === "asc",
                      )
                  }
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex basis-1/4">
                <Button
                  onClick={() =>
                    table
                      .getColumn("price")
                      ?.toggleSorting(
                        table.getColumn("price")?.getIsSorted() === "asc",
                      )
                  }
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex basis-1/4">
                <Button
                  onClick={() =>
                    table
                      .getColumn("hour1")
                      ?.toggleSorting(
                        table.getColumn("hour1")?.getIsSorted() === "asc",
                      )
                  }
                >
                  1h%
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex basis-1/4">
                <Button
                  onClick={() =>
                    table
                      .getColumn("hour24")
                      ?.toggleSorting(
                        table.getColumn("hour24")?.getIsSorted() === "asc",
                      )
                  }
                >
                  24h%
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {portfolioData.isFetching && initialData == null ? (
          <div>
            <div className="h-24 text-center">
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        ) : !!table?.getRowModel()?.rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <div
              className="p-3 flex justify-between text-xl cursor-pointer bg-muted/60 hover:bg-muted/90 text-foreground rounded-xl shadow-sm shadow-foreground/20"
              key={index}
              data-state={row.getIsSelected() && "selected"}
            >
              <div className="basis-1/2 flex flex-col gap-2">
                <span className="flex text-[14px] leading-[21px] items-center">
                  <Image
                    alt="scroll"
                    src="/assets/images/starkLogo.png"
                    className="w-4 h-4 mr-[5px]"
                    width={16}
                    height={16}
                  />
                  Stark
                </span>
                <div className="flex gap-3">
                  <span className="border border-border bg-card rounded-lg text-[16px] leading-[24px] py-1 font-semibold px-6">
                    $
                    {zeroFormatterHtml(roundPrice(row.getValue("value")), 4) ??
                      "--"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="leading-[24px] text-[16px] font-semibold">
                      {row.getValue("name")}
                    </span>
                    <span className="leading-[21px] text-[14px] font-normal">
                      {row.getValue<string>("symbol")?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="basis-1/2 flex justify-end items-center">
                <div className="w-[500px] flex gap-1 items-center">
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-foreground">
                      AMOUNT
                    </span>
                    <span className="leading-[21px] text-[14px]">
                      {isSmaller(row.getValue("balance"), 0.1, 2)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-foreground">
                      PRICE USD
                    </span>
                    <span className="leading-[21px] text-[14px]">
                      {zeroFormatterHtml(
                        roundPrice(row.getValue("price")),
                        4,
                      ) ?? "--"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-foreground">
                      1H
                    </span>
                    <span
                      className={`leading-[21px] text-[14px] ${row.getValue<number>("hour1") < 0 ? "text-red-300" : ""}`}
                    >
                      {Math.abs(
                        Number(roundNumber(row.getValue("hour1"), 2)),
                      ) || "--" + "%"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-[12px] leading-[14px] text-[rgba(121, 121, 121)]">
                      24H
                    </span>
                    <span
                      className={`leading-[21px] text-[14px] ${row.getValue<number>("hour24") < 0 ? "text-red-300" : ""}`}
                    >
                      {Math.abs(
                        Number(roundNumber(row.getValue("hour24"), 2)),
                      ) || "--" + "%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="h-24 text-center">There is no assets</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4"></div>
    </div>
  );
}
