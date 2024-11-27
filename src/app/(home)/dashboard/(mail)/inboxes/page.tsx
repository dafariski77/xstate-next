"use client";

import Mail from "@/components/mails/mail";
import React from "react";
import Cookies from "js-cookie";

export default function IbnboxesPage() {
  const layout = Cookies.get("react-resizable-panels:layout:mail");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  return (
    <div className="flex flex-col gap-y-10">
      <Mail defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} />
    </div>
  );
}
