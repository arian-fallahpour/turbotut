import React from "react";
import classes from "./ProblemSection.module.scss";
import Light from "@/components/Elements/Light/Light";
import { join } from "@/utils/helper";

const Problem = () => {
  return (
    <div className={join(classes.Problem, classes.Content)}>
      <Light width="20rem" />
      <h2 className="header header-section text-center color-orange">The problem</h2>
      <p className="paragraph text-center">
        In order to get the best possible grades, you need to sacrifice other crucial aspects of your life such as
        social life, or sleep
      </p>
    </div>
  );
};

export default Problem;
