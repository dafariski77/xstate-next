import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function RecentTransactions() {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9 flex items-center justify-center">
        <AvatarImage src="/avatar/01.png" alt="User" />
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">Martin Paes</p>
        <p className="text-sm text-muted-foreground">martinpaes@gmail.com</p>
      </div>
      <div className="ml-auto font-medium">+$1,222.00</div>
    </div>
  );
}
