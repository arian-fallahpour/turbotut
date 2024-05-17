"use client";

import React, { Fragment, useState } from "react";
import classes from "./SubscriptionSection.module.scss";
import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { join } from "@/utils/helper";
import { BASE_URL } from "@/utils/config";
import business from "@/data/business";
import Reveal from "@/components/Elements/Reveal/Reveal";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import { startProgress, stopProgress } from "next-nprogress-bar";

const SubscriptionSection = ({ className, limit }) => {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const toggleRevealedHandler = () => {
    const fetchData = async () => {
      // Fetch data if not available already
      if (!data && !revealed) {
        // Add loading state
        startProgress();

        const res = await fetch(`${BASE_URL}/api/users/my-subscription`, {
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

  const changeSubscriptionHandler = (cancelsAtPeriodEnd) => {
    const changeSubscription = async (cancelsAtPeriodEnd) => {
      // Add loading state
      startProgress();

      // Make request to cancel subscription
      const res = await fetch(`${BASE_URL}/api/users/my-subscription`, {
        method: "PATCH",
        cache: "no-store",
        body: JSON.stringify({
          cancelsAtPeriodEnd,
        }),
      });

      const resData = await res.json();

      // Check for any errors
      if (!res.ok) {
        setError(new Error(resData.message));
      }

      // Remove loading state
      stopProgress();

      // update state with new data
      setData((p) => ({
        ...p,
        subscription: { ...p.subscription, ...resData.data.subscription },
      }));
    };

    changeSubscription(cancelsAtPeriodEnd);
  };

  const dataSubscriptionStartEndText =
    data?.subscription &&
    `current period: ${new Date(
      data.subscription.startsAt
    ).toLocaleDateString()} to ${new Date(
      data.subscription.endsAt
    ).toLocaleDateString()}`;

  const dataSubscriptionCancelledText =
    data?.subscription &&
    `You ${
      data.subscription.cancelsAtPeriodEnd ? "will not" : "will continue to"
    } be billed at the end of this period${
      data.subscription.cancelsAtPeriodEnd ? " since you cancelled" : ""
    }`;

  return (
    <Section className={className} limit={limit}>
      <div
        className={join(
          classes.Subscription,
          revealed ? classes.revealed : null
        )}
      >
        {/* HEADER */}
        <header className={classes.SubscriptionHeader}>
          <h2 className="header header-section">Subscription</h2>
          <Button
            className={classes.SubscriptionExpand}
            onClick={toggleRevealedHandler}
          >
            <AddRoundedIcon fontSize="inherit" />
          </Button>
        </header>

        {/* REVEAL */}
        <Reveal revealed={revealed}>
          <div className={classes.SubscriptionContent}>
            {error && (
              <ErrorBlock
                className={classes.SubscriptionError}
                message={error.message}
              />
            )}
            {!error && (
              <Fragment>
                <ul className={classes.SubscriptionList}>
                  <li className={classes.SubscriptionListItem}>
                    {dataSubscriptionStartEndText}
                  </li>
                  <li className={classes.SubscriptionListItem}>
                    {dataSubscriptionCancelledText}
                  </li>
                  <li className={classes.SubscriptionListItem}>
                    Monthly rate: ${business.plans[0].price} per month
                  </li>
                </ul>
                <div className={classes.SubscriptionActions}>
                  {data?.subscription.cancelsAtPeriodEnd && (
                    <Button
                      styleName="fill"
                      variantName="green"
                      onClick={() => changeSubscriptionHandler(false)}
                    >
                      continue subscription
                    </Button>
                  )}
                  {!data?.subscription.cancelsAtPeriodEnd && (
                    <Button
                      styleName="fill"
                      variantName="red"
                      onClick={() => changeSubscriptionHandler(true)}
                    >
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
