"use client";

import React, { useCallback } from "react";

import business from "@/data/business";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_PUBLIC_KEY } from "@/utils/config";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// TODO: Manage errors

const Checkout = () => {
  const fetchClientSecret = useCallback(() => {
    const lookUpKey = business.plans[0].stripeLookUpKey;
    const fetchString = `/api/stripe/checkout-session/${lookUpKey}`;

    // Create a Checkout Session
    return fetch(fetchString, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
