import Section from "@/components/Elements/Section/Section";
import Accordion from "@/components/Elements/Accordion/Accordion";
import React from "react";
import business from "@/app/data/business";

const InfoSection = () => {
  return (
    <Section limit="70rem" name="faq">
      <h2 className="header header-section text-center">
        Frequently Asked Questions
      </h2>
      <Accordion items={business.faq} />
    </Section>
  );
};

export default InfoSection;
