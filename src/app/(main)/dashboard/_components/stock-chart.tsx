'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { inventoryChartData } from "@/lib/data";

const chartConfig = {
  stock: {
    label: "Stock",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function StockChart() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Top 5 Products by Stock</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
            <BarChart data={inventoryChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + "..." : value}
                />
                <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                dataKey="stock"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
