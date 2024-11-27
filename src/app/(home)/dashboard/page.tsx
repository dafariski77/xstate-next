"use client";

import CardStat from "@/components/card-stat";
import DashboardChart from "@/components/dashboard-chart";
import DateRangePicker from "@/components/date-range";
import RecentTransactions from "@/components/recent-transactions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTitle } from "@/helpers/path";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const path = usePathname();

  const pageTitle = getTitle(path);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold">{pageTitle}</h4>
        <div className="flex gap-x-4">
          <DateRangePicker />
          <Button size={"sm"}>Download</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStat />
        <CardStat />
        <CardStat />
        <CardStat />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              You made 69 transactions this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Array.from([1, 2, 3, 4, 5, 6, 7]).map((_, i) => (
                <RecentTransactions key={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
