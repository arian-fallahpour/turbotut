import React from "react";
import classes from "./CtaSection.module.scss";

import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";
import Image from "next/image";

const CtaSection = () => {
  return (
    <Section className={classes.CtaSection}>
      <div className={classes.Cta}>
        <div className={classes.CtaContent}>
          <h2 className="header header-section">What are you waiting for?</h2>
          <p className="paragraph">
            Don&apos;t wait! Get learning as fast as possible and ace all your tests and exams.
          </p>
          <Button variantName="white" href="/pricing" isLink>
            Get started
          </Button>
        </div>
        <div className={classes.CtaImage}>
          <Image
            alt="People using a chalk board"
            src="/images/app/image-2.png"
            sizes="(max-width: 450px) 90vw, (max-width: 750px) 60vw, (max-width: 450px) 90vw, 33vw"
            fill
          />
        </div>
      </div>
    </Section>
  );
};

export default CtaSection;
