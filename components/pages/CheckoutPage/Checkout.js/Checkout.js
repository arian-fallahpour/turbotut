"use client";

import React, { useCallback } from "react";
import { redirect, useSearchParams } from "next/navigation";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_PUBLIC_KEY } from "@/utils/config";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Checkout = () => {
  // Create fetch string depending on pricing type
  const searchParams = useSearchParams();
  const pricingType = searchParams.get("pricing");
  let fetchString;
  if (pricingType === "course") {
    const courseSlug = searchParams.get("course");
    fetchString = `/api/stripe/checkout-sessions/course/${courseSlug}`;
  } else if (pricingType === "premium") {
    fetchString = `/api/stripe/checkout-sessions/premium`;
  } else {
    redirect("/"); // Redirect if pricing type is invalid
  }

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(fetchString, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [fetchString]);

  const options = { fetchClientSecret };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
