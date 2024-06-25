import React from "react";
import classes from "./ProblemSection.module.scss";
import { join } from "@/utils/helper";

const Reality = () => {
  return (
    <div className={join(classes.Reality, classes.Content)}>
      <h2 className="header header-section text-center color-red">The reality</h2>
    </div>
  );
};

export default Reality;
