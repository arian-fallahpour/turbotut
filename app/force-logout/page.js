"use client";

import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return <div></div>;
}
