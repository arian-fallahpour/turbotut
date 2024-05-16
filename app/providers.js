"use client";

import { LoginProvider } from "@/store/login-context";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }) {
  return (
    <Suspense>
      <ProgressBar
        height="5px"
        color="rgb(255, 165, 0)"
        options={{ showSpinner: false }}
        // shallowRouting
      />
      <SessionProvider>
        <LoginProvider>{children}</LoginProvider>
      </SessionProvider>
    </Suspense>
  );
}
