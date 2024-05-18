"use client";

import React, { useContext, useState } from "react";
import classes from "./PaymentMethodsSection.module.scss";
import { join } from "@/utils/helper";
import { STRIPE_PUBLIC_KEY } from "@/utils/config";
import { ModalContext } from "@/store/modal-context";

import Card from "./Card";
import Modal from "./Modal";
import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Reveal from "@/components/Elements/Reveal/Reveal";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

import { loadStripe } from "@stripe/stripe-js";
import { startProgress, stopProgress } from "next-nprogress-bar";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PaymentMethodsSection = ({ className, limit }) => {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { showModal, hideModal } = useContext(ModalContext);

  const toggleRevealedHandler = () => {
    const fetchData = async () => {
      // Fetch data if not available already
      if (!data && !revealed) {
        // Add loading state
        startProgress();

        const res = await fetch(`/api/users/my-payment-methods`, {
          cache: "no-store",
        });
        const resData = await res.json();

        // Check for any errors
        if (!res.ok) {
          setError(new Error(resData.message));
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

  const addCardHandler = () => {
    const addCard = async () => {
      // Add loading state
      startProgress();

      // Make request to get checkout session id
      const res = await fetch(`/api/users/my-payment-methods`, {
        method: "POST",
        cache: "no-store",
      });
      const resData = await res.json();

      // Check for any errors
      if (!res.ok) {
        setError(new Error(resData.message));
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

  const detachCardConfirmHandler = (id) => {
    const detachCard = async () => {
      // Add loading state
      startProgress();

      const res = await fetch(`/api/users/my-payment-methods/${id}`, {
        method: "DELETE",
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

      // Hide modal
      hideModal();

      // Update data
      setData(resData.data);
    };

    detachCard();
  };

  const showDetachModalHandler = (id) => {
    // Show confirmation modal
    showModal(
      <Modal
        onCancel={hideModal}
        onConfirm={() => detachCardConfirmHandler(id)}
        cards={data.cards}
      />
    );
  };

  const setDefaultCardHandler = (id) => {
    const setDefault = async () => {
      // Add loading state
      startProgress();

      const res = await fetch(`/api/users/my-payment-methods/${id}/default`, {
        method: "PATCH",
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

      // Update data
      setData(resData.data);
    };

    setDefault();
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
            <ul className={classes.Cards}>
              {/* API error */}
              {error && (
                <ErrorBlock
                  className={classes.PaymentMethodsError}
                  message={error.message}
                />
              )}

              {/* No cards */}
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
                    onSetDefault={setDefaultCardHandler}
                    onDetachCard={showDetachModalHandler}
                  />
                ))}
            </ul>

            <Button
              className={classes.PaymentMethodsActions}
              styleName="shiny"
              onClick={addCardHandler}
            >
              add card
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default PaymentMethodsSection;
// TODO: Test UI and API in "extreme" cases
