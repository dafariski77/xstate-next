"use client";

import { mailMachine } from "@/machines/mailMachines";
import { createActorContext } from "@xstate/react";
import React from "react";

export const MailContext = createActorContext(mailMachine);

export default function MailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MailContext.Provider>{children}</MailContext.Provider>;
}
