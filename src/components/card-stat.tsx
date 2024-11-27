import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";

export default function CardStat() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="text-muted-foreground w-5 h-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$23,233.98</div>
        <p className="text-xs text-muted-foreground">+20% from last month</p>
      </CardContent>
    </Card>
  );
}
