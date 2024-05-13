"use client";

import { LoginProvider } from "@/store/login-context";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export function Providers({ children }) {
  return (
    <Suspense>
      <SessionProvider>
        <LoginProvider>{children}</LoginProvider>
      </SessionProvider>
    </Suspense>
  );
}
