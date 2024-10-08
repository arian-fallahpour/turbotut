"use client";

import React, { Fragment, useContext, useState } from "react";
import { ModalContext } from "@/store/modal-context";
import { GlobalErrorContext } from "@/store/error-context";
import classes from "./SubscriptionSection.module.scss";

import { join } from "@/utils/helper";
import business from "@/app/data/business";
import { startProgress, stopProgress } from "next-nprogress-bar";

import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";
import Reveal from "@/components/Elements/Reveal/Reveal";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

import Modal from "./Modal";
import AddIcon from "@/components/Elements/Icons/AddIcon";

const SubscriptionSection = ({ className, limit }) => {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { setGlobalError } = useContext(GlobalErrorContext);
  const { showModal, hideModal } = useContext(ModalContext);

  const toggleRevealedHandler = () => {
    const fetchData = async () => {
      // Fetch data if not available already
      if (!data && !revealed) {
        // Add loading state
        startProgress();

        const res = await fetch(`/api/users/my-subscription`, {
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
        setData(resData.data || {});
      }

      setRevealed((p) => !p);
    };

    fetchData();
  };

  const changeSubscriptionConfirmHandler = (cancelsAtPeriodEnd) => {
    const changeSubscription = async () => {
      // Add loading state
      startProgress();

      // Make request to cancel subscription
      const res = await fetch(`/api/users/my-subscription`, {
        method: "PATCH",
        cache: "no-store",
        body: JSON.stringify({
          cancelsAtPeriodEnd,
        }),
      });

      const resData = await res.json();

      hideModal();
      stopProgress();

      if (!res.ok) {
        setGlobalError(resData.message);
      } else {
        setData((p) => ({
          ...p,
          subscription: { ...p.subscription, ...resData.data.subscription },
        }));
      }
    };

    changeSubscription();
  };

  const changeSubscriptionModalHandler = (cancelsAtPeriodEnd) => {
    if (cancelsAtPeriodEnd) {
      showModal(<Modal onCancel={hideModal} onConfirm={() => changeSubscriptionConfirmHandler(cancelsAtPeriodEnd)} />);
    } else {
      changeSubscriptionConfirmHandler(cancelsAtPeriodEnd);
    }
  };

  const dataSubscriptionStartEndText =
    data?.subscription &&
    `current period: ${new Date(data.subscription.startsAt).toLocaleDateString()} to ${new Date(
      data.subscription.endsAt
    ).toLocaleDateString()}`;

  const dataSubscriptionCancelledText =
    data?.subscription &&
    `You ${data.subscription.cancelsAtPeriodEnd ? "will not" : "will continue to"} be billed at the end of this period${
      data.subscription.cancelsAtPeriodEnd ? " since you cancelled" : ""
    }`;

  return (
    <Section className={className} limit={limit}>
      <div className={join(classes.Subscription, revealed ? classes.revealed : null)}>
        {/* HEADER */}
        <header className={classes.SubscriptionHeader}>
          <h2 className="header header-section">Subscription</h2>
          <Button className={classes.SubscriptionExpand} onClick={toggleRevealedHandler}>
            <AddIcon />
          </Button>
        </header>

        {/* REVEAL */}
        <Reveal revealed={revealed}>
          <div className={classes.SubscriptionContent}>
            {error && (
              <Fragment>
                <ErrorBlock className={classes.SubscriptionError} type="info" message={error.message} />
                <div className={classes.SubscriptionActions}>
                  <Button styleName="shiny" href="/pricing" isLink>
                    buy subscription
                  </Button>
                </div>
              </Fragment>
            )}
            {!error && (
              <Fragment>
                <ul className={classes.SubscriptionList}>
                  <li className={classes.SubscriptionListItem}>{dataSubscriptionStartEndText}</li>
                  <li className={classes.SubscriptionListItem}>{dataSubscriptionCancelledText}</li>
                  <li className={classes.SubscriptionListItem}>Monthly rate: ${business.plans[0].price} per month</li>
                </ul>
                <div className={classes.SubscriptionActions}>
                  {data?.subscription.cancelsAtPeriodEnd && (
                    <Button styleName="shiny" variantName="green" onClick={() => changeSubscriptionModalHandler(false)}>
                      continue subscription
                    </Button>
                  )}
                  {!data?.subscription.cancelsAtPeriodEnd && (
                    <Button styleName="shiny" variantName="red" onClick={() => changeSubscriptionModalHandler(true)}>
                      cancel subscription
                    </Button>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default SubscriptionSection;
