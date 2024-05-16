"use client";

import Section from "@/components/Elements/Section/Section";
import classes from "./PaymentMethodsSection.module.scss";
import { join } from "@/utils/helper";
import React, { Fragment, useState } from "react";
import Button from "@/components/Elements/Button/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Reveal from "@/components/Elements/Reveal/Reveal";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import { BASE_URL, STRIPE_PUBLIC_KEY } from "@/utils/config";
import Card from "./Card";
import { loadStripe } from "@stripe/stripe-js";
import { startProgress, stopProgress } from "next-nprogress-bar";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PaymentMethodsSection = ({ className, limit }) => {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const toggleRevealedHandler = () => {
    const fetchData = async () => {
      // Fetch data if not available already
      if (!data) {
        // Add loading state
        startProgress();

        const res = await fetch(`${BASE_URL}/api/users/my-payment-methods`, {
          cache: "no-store",
        });
        const resData = await res.json();

        // Check for any errors
        if (!res.ok) {
          setError(new Error(resData.message));
          return;
        }

        // Remove loading state
        stopProgress();

        // Set state data
        setData(resData.data);
      }

      setRevealed((p) => !p);
    };

    fetchData();
  };

  const addCardHandler = (id) => {
    const addCard = async () => {
      // Add loading state
      startProgress();

      // Make request to get checkout session id
      const res = await fetch(`${BASE_URL}/api/users/my-payment-methods`, {
        method: "POST",
        cache: "no-store",
      });

      const resData = await res.json();

      // Check for any errors
      if (!res.ok) {
        setError(new Error(resData.message));
        return;
      }

      // Remove loading state
      stopProgress();

      // Redirect user to checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: resData.sessionId,
      });

      if (error) {
        setError(error);
      }
    };

    addCard();
  };

  const detachCardHandler = (id) => {
    const detachCard = async () => {
      // Add loading state
      startProgress();

      const res = await fetch(
        `${BASE_URL}/api/users/my-payment-methods/${id}`,
        {
          method: "DELETE",
          cache: "no-store",
        }
      );

      // Check for any errors
      if (!res.ok) {
        const resData = await res.json();
        setError(new Error(resData.message));
      }

      // TODO: Add modal that warns about cancelling subscription

      // Remove loading state
      stopProgress();

      // Update data
      const updatedData = data.cards.filter((card) => card.id !== id);
      setData({ cards: updatedData });
    };

    detachCard();
  };

  return (
    <Section
      className={join(className, classes.PaymentMethodsSection)}
      limit={limit}
    >
      <div
        className={join(
          classes.PaymentMethods,
          revealed ? classes.revealed : null
        )}
      >
        {/* HEADER */}
        <div className={classes.PaymentMethodsHeader}>
          <h2 className="header header-section">payment methods</h2>
          <Button
            className={classes.PaymentMethodsExpand}
            onClick={toggleRevealedHandler}
          >
            <AddRoundedIcon fontSize="inherit" />
          </Button>
        </div>

        {/* REVEAL */}
        <Reveal revealed={revealed}>
          <div className={classes.PaymentMethodsContent}>
            {error && (
              <ErrorBlock
                className={classes.PaymentMethodsError}
                message={error.message}
              />
            )}
            {!error && (
              <Fragment>
                <ul className={classes.Cards}>
                  {data?.cards.length === 0 && (
                    <ErrorBlock
                      className={classes.CardsError}
                      type="info"
                      message="You do not have any payment methods"
                    />
                  )}

                  {data?.cards.length > 0 &&
                    data.cards.map((card) => (
                      <Card
                        key={card.id}
                        id={card.id}
                        {...card.card}
                        onDetachCard={detachCardHandler}
                      />
                    ))}
                </ul>

                <Button
                  className={classes.PaymentMethodsActions}
                  styleName="fill"
                  onClick={addCardHandler}
                >
                  add card
                </Button>
              </Fragment>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default PaymentMethodsSection;
