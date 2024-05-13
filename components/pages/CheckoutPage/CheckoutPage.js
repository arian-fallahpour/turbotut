import React from "react";
import Page from "@/components/Elements/Page/Page";
import classes from "./CheckoutPage.module.scss";

import Section from "@/components/Elements/Section/Section";
import Checkout from "./Checkout.js/Checkout";

const CheckoutPage = () => {
  return (
    <Page background="flat">
      <Section className={classes.CheckoutSection}>
        <Checkout />
      </Section>
    </Page>
  );
};

export default CheckoutPage;
