"use client";

import React, { useCallback, useState } from "react";

import business from "@/data/business";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_PUBLIC_KEY } from "@/utils/config";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// TODO: Manage errors

const Checkout = () => {
  const [error, setError] = useState(null);

  const fetchClientSecret = useCallback(() => {
    const lookUpKey = business.plans[0].stripeLookUpKey;

    // Create a Checkout Session
    return fetch(`/api/stripe/checkout-session/${lookUpKey}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  // TODO: Figure out how to display errors

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      {error && <ErrorBlock message={error.message} />}
      {!error && <EmbeddedCheckout />}
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
