"use client";

import { LoginProvider } from "@/store/login-context";
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
        <ModalProvider>
          <LoginProvider>{children}</LoginProvider>
        </ModalProvider>
      </SessionProvider>
    </Suspense>
  );
}
