"use client";

import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import React from "react";

export default function ClientSessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>; // Wrap children with SessionProvider
}
