import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { randomChartData } from "@/helpers/random";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: randomChartData() },
  { month: "February", desktop: randomChartData() },
  { month: "March", desktop: randomChartData() },
  { month: "April", desktop: randomChartData() },
  { month: "May", desktop: randomChartData() },
  { month: "June", desktop: randomChartData() },
  { month: "July", desktop: randomChartData() },
  { month: "August", desktop: randomChartData() },
  { month: "September", desktop: randomChartData() },
  { month: "October", desktop: randomChartData() },
  { month: "November", desktop: randomChartData() },
  { month: "December", desktop: randomChartData() },
];

export default function DashboardChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"month"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="currentColor" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
