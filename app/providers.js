"use client";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ModalProvider } from "@/store/modal-context";

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
        <ModalProvider>{children}</ModalProvider>
      </SessionProvider>
    </Suspense>
  );
}
