"use client";

import { loginMachine } from "@/machines/loginMachine";
import { createActorContext } from "@xstate/react";
import React from "react";

export const AuthContext = createActorContext(loginMachine);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
