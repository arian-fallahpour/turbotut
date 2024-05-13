import Section from "@/components/Elements/Section/Section";
import Accordion from "@/components/Elements/Accordion/Accordion";
import React from "react";

const faqData = [
  {
    title: "Are there refunds?",
    description:
      "We do not offer refunds due to the courses being around 1-2 hours long. Most people would simply go through the courses, then refund.",
  },
  {
    title: "How long are the courses on average?",
    description:
      "The courses are around 1-2 hours of length on average. They cover only the most necessary materials and do not waste any time.",
  },
  {
    title: "If I buy a course, do I own it forever?",
    description:
      "Yes, if you buy courses individually, you can keep them forever. However, if you buy premium, you get all the courses, but only for one month until you renew it again.",
  },
];

const InfoSection = () => {
  // Info (left)
  // FAQ accordion (right)

  return (
    <Section limit="70rem">
      <h2 className="header header-section text-center">
        Frequently Asked Questions
      </h2>
      <Accordion items={faqData} />
    </Section>
  );
};

export default InfoSection;
