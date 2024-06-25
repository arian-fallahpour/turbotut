import React from "react";
import classes from "./ProblemSection.module.scss";

import Section from "@/components/Elements/Section/Section";
import Problem from "./Problem";
import Game from "./Game";
import Reality from "./Reality";

const ProblemSection = () => {
  return (
    <Section className={classes.ProblemSection}>
      <span className={classes.ContainerShadow} />
      <div className={classes.Container}>
        <span className={classes.ContainerGradient} />
        <div className={classes.ContainerContent}>
          <Problem />
          <Game />
          <Reality />
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;
