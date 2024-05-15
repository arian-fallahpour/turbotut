import React from "react";
import classes from "./PricingPage.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Price from "./Price/Price";

import business from "@/data/business";

const PricingPage = () => {
  return (
    <Page>
      <Section>
        <h1 className="header header-title text-center">Pricing</h1>
        <div className={classes.Prices}>
          {business.plans.map((plan, i) => (
            <Price key={plan.name} {...plan} />
          ))}
        </div>

        <p className="paragraph text-center">
          (personally I think it&apos;s worth it to get{" "}
          <span className="text-emoji">🅰️</span>&apos;s in all subjects, but I
          don&apos;t know about you <span className="text-emoji">🤪</span>)
        </p>
      </Section>
    </Page>
  );
};

export default PricingPage;
