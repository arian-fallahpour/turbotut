import React from "react";
import classes from "./SolutionSection.module.scss";

import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";

import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";
import Image from "next/image";

const SolutionSection = () => {
  return (
    <Section className={classes.SolutionSection}>
      <div className={classes.SolutionSectionContent}>
        <div className={classes.Content}>
          <h2 className="header header-section color-green">Our solution</h2>
          <p className="paragraph">
            We provide a number of ways that will guarantee your success in
            school, and as long as you take advantage of them, you will reap its
            benefits
          </p>

          <ul className={classes.ContentList}>
            <li className={classes.ContentListItem}>
              <div className={classes.Reason}>
                <div className={classes.ReasonContainer}>
                  <div className={classes.ReasonIcon}>
                    <KeyRoundedIcon fontSize="inherit" />
                  </div>
                  <div className={classes.ReasonContent}>
                    <h3 className="header header-card">Captivating lectures</h3>
                    <p className="paragraph">
                      Our lectures utilize{" "}
                      <span className="color-green">animations</span> to
                      visualize concepts in order for you to understand them
                      better and faster
                    </p>
                  </div>
                </div>
                <span className={classes.ReasonGlow} />
              </div>
            </li>
            <li className={classes.ContentListItem}>
              <div className={classes.Reason}>
                <div className={classes.ReasonContainer}>
                  <div className={classes.ReasonIcon}>
                    <FlashOnRoundedIcon fontSize="inherit" />
                  </div>
                  <div className={classes.ReasonContent}>
                    <h3 className="header header-card">Special benefits</h3>
                    <ul className="ul">
                      <li className="li">
                        <span className="color-green">Secret tricks</span> used
                        by top students
                      </li>
                      <li className="li">
                        <span className="color-green">Critical thinking</span>{" "}
                        questions to push you further
                      </li>
                    </ul>
                  </div>
                </div>
                <span className={classes.ReasonGlow} />
              </div>
            </li>
          </ul>

          <Button
            className={classes.ContentButton}
            variantName="green"
            href="/courses/calculus"
            isLink
          >
            View questions
          </Button>
        </div>
      </div>
      <div className={classes.SolutionSectionImage}>
        <div className={classes.Image}>
          <Image
            alt="Student studying hard"
            src="/images/app/studying-1.png"
            fill
          />
        </div>
      </div>
    </Section>
  );
};

export default SolutionSection;
