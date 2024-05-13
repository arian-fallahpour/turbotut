import React from "react";
import classes from "./PricingPage.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Price from "./Price/Price";

import plans from "@/data/plans.json";

const PricingPage = () => {
  return (
    <Page>
      <Section>
        <h1 className="header header-title text-center">Pricing</h1>
        <div className={classes.Prices}>
          {plans.map((plan, i) => (
            <Price key={plan.name} {...plan} />
          ))}
        </div>
        <p className="paragraph text-center">
          (personally I think $9.99 for an{" "}
          <span className="text-emoji">🅰️</span> is worth it, I don&apos;t know
          about you <span className="text-emoji">🤪</span>)
        </p>
      </Section>
    </Page>
  );
};

export default PricingPage;
