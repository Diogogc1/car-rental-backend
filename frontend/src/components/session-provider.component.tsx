"use client";

import ReactQueryProvider from "@/lib/react-query.provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}
