"use client";

import * as React from "react";
import { PieChart, Pie, Sector, Label } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PortfolioData } from "./types";
import { trpc } from "@/app/_trpc/client";
import { useEffect, useMemo } from "react";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function PortfolioPieChart({
  initialData,
  address,
}: {
  initialData?: PortfolioData;
  address: string;
}) {
  const portfolioData = trpc.portfolioRouter.getPortfolioData.useQuery(
    {
      address,
    },
    { initialData },
  );

  const cryptoData = useMemo(() => {
    return (
      portfolioData.data?.tokenData
        .filter((token) => token.name !== undefined)
        .map((token) => {
          return {
            currency: token.name,
            balance: token.value,
            symbol: token.symbol,
          };
        }) || []
    );
  }, [portfolioData]);

  const id = "pie-interactive";
  const [activeCurrency, setActiveCurrency] = React.useState(
    cryptoData[0]?.currency,
  );
  const [hoverCurrency, setHoverCurrency] = React.useState<string | null>(null);

  const processedData = React.useMemo(() => {
    const sortedData = [...cryptoData].sort((a, b) => b.balance - a.balance);
    const topFour = sortedData.slice(0, 4);
    const others = sortedData.slice(4);

    const result = topFour.map((item, index) => ({
      ...item,
      fill: COLORS[index],
    }));

    if (others.length > 0) {
      const othersTotal = others.reduce((sum, item) => sum + item.balance, 0);
      result.push({
        currency: "Others",
        balance: othersTotal,
        symbol: "OTHER",
        fill: COLORS[4],
      });
    }

    return result;
  }, [cryptoData]);

  const totalValue = React.useMemo(
    () => processedData.reduce((sum, crypto) => sum + crypto.balance, 0),
    [processedData],
  );

  const activeIndex = React.useMemo(
    () => processedData.findIndex((item) => item?.currency === activeCurrency),
    [activeCurrency, processedData],
  );

  const handleMouseEnter = (currency: string) => {
    setHoverCurrency(currency);
  };

  const handleMouseLeave = () => {
    setHoverCurrency(null);
  };

  const handleClick = (currency: string) => {
    setActiveCurrency(currency);
  };

  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    processedData.forEach((item, index) => {
      config[item.currency.toLowerCase()] = {
        label: item.symbol,
        color: item.fill,
      };
    });
    return config;
  }, [processedData]);

  return (
    <Card data-chart={id} className="flex flex-col">
      <CardContent className="flex gap-2">
        <div className="flex items-center justify-center order-2 md:order-1">
          <Table>
            <TableBody>
              {processedData.map((data) => (
                <TableRow
                  key={data.currency}
                  className={`rounded-lg cursor-pointer border-0 ${activeCurrency === data.currency ? "bg-muted/50" : ""}`}
                  onClick={() => handleClick(data.currency)}
                >
                  <TableCell className="py-1">
                    {chartConfig[data.currency.toLowerCase()].label}
                  </TableCell>
                  <TableCell className="py-1 text-right">
                    {((data.balance / totalValue) * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ChartContainer
          id={id}
          config={chartConfig}
          className="aspect-square w-[200px] p-4 order-1 md:order-2"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData}
              dataKey="balance"
              nameKey="currency"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              strokeWidth={6}
              activeIndex={
                hoverCurrency
                  ? processedData.findIndex(
                      (item) => item?.currency === hoverCurrency,
                    )
                  : activeIndex
              }
              onMouseEnter={(_, index) =>
                handleMouseEnter(processedData[index].currency)
              }
              onMouseLeave={handleMouseLeave}
              activeShape={({
                cx,
                cy,
                innerRadius,
                outerRadius,
                startAngle,
                endAngle,
                fill,
              }) => (
                <g>
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 7.5}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const currentData =
                      processedData[
                        hoverCurrency
                          ? processedData.findIndex(
                              (item) => item?.currency === hoverCurrency,
                            )
                          : activeIndex
                      ];
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 10}
                          className="fill-foreground text-lg font-bold"
                        >
                          ${currentData?.balance.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-muted-foreground text-sm"
                        >
                          {currentData?.currency}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
