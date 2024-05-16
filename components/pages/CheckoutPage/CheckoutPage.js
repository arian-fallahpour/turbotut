import React from "react";
import Page from "@/components/Elements/Page/Page";
import classes from "./CheckoutPage.module.scss";

import Section from "@/components/Elements/Section/Section";
import Checkout from "./Checkout.js/Checkout";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const CheckoutPage = async () => {
  const session = await getServerSession(options);

  return (
    <Page background="flat" session={session} requiresSession>
      <Section className={classes.CheckoutSection}>
        <Checkout />
      </Section>
    </Page>
  );
};

export default CheckoutPage;
