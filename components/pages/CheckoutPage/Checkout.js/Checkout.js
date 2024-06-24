"use client";

import React, { useEffect, useState } from "react";

import business from "@/app/data/business";

import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const lookUpKey = business.plans[0].stripeLookUpKey;
      const res = await fetch(`/api/stripe/checkout-session/${lookUpKey}`, {
        method: "POST",
        cache: "no-store",
      });
      const resData = await res.json();
      if (!res.ok) {
        setError(new Error(resData.message));
      }

      setData(resData);
    };

    fetchClientSecret();
  }, []);

  const options = {
    clientSecret: data?.clientSecret ? data.clientSecret : null,
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      {error && <ErrorBlock message={error.message} />}
      {!error && <EmbeddedCheckout />}
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
