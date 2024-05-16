"use client";

import React, { useCallback, useEffect, useState } from "react";

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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      // Add loading state

      const lookUpKey = business.plans[0].stripeLookUpKey;
      const res = await fetch(`/api/stripe/checkout-session/${lookUpKey}`, {
        method: "POST",
      });

      const resData = await res.json();

      if (!res.ok) {
        setError(new Error(resData.message));
        return;
      }

      // Remove loading state

      setData(resData.data);
    };

    fetchClientSecret();
  }, []);

  const options = {
    clientSecret: data && data.clientSecret ? data.clientSecret : null,
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      {error && <ErrorBlock message={error.message} />}
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
