import React from "react";
import classes from "./Background.module.scss";
import { join } from "@/utils/helper";

const Background = ({ style }) => {
  return (
    <span
      className={join(classes.Background, classes[`Background--${style}`])}
    />
  );
};

export default Background;
