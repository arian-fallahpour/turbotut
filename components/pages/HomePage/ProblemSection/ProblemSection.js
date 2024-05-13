import React from "react";
import classes from "./ProblemSection.module.scss";

import Section from "@/components/Elements/Section/Section";
import TriangleGame from "./TriangleGame/TriangleGame";

const ProblemSection = () => {
  // The triangle problem (left)
  // Copy paste previous points (right)

  return (
    <Section className={classes.ProblemSection} limit={null}>
      <div className={classes.ProblemSectionContent}>
        <TriangleGame />
        <div className={classes.Reality}>
          <h3 className="header header-section text-center">the reality</h3>
          <p className="paragraph text-center">
            In order to get the best possible grades, you need to sacrifice
            other crucial aspects of your life such as social life, or sleep
          </p>
        </div>

        <div className={classes.Problems}>
          <h3 className="header header-section text-center">As a student...</h3>
          <div className={classes.ProblemsContent}>
            <div className={classes.Problem}>
              <span className="text-emoji">🕒</span>
              <p className="paragraph text-center">
                You have a limited amount of time for in-depth learning
              </p>
            </div>
            <div className={classes.Problem}>
              <span className="text-emoji">📚</span>
              <p className="paragraph text-center">
                You are pressured to excel in multiple subjects
              </p>
            </div>
            <div className={classes.Problem}>
              <span className="text-emoji">📉</span>
              <p className="paragraph text-center">
                You are unable to learn effectively through traditional methods
              </p>
            </div>
            <div className={classes.Problem}>
              <span className="text-emoji">🪖</span>
              <p className="paragraph text-center">
                You are not given the right material to prepare for tests
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;
