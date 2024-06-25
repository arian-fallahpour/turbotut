import React from "react";
import classes from "./Light.module.scss";
import { join } from "@/utils/helper";

const Light = ({
  className,
  color = "var(--c-orange)",
  width = "15rem",
  height = ".5rem",
  position = "up",
  ...otherProps
}) => {
  return (
    <div className={join(classes.Light, classes[`Light--${position}`], className)} style={{ color }} {...otherProps}>
      <span
        className={classes.Light1}
        style={{ width: `calc(2 * ${height})`, borderBottomRightRadius: height, borderTopLeftRadius: height }}
      />
      <span className={classes.Light2} style={{ width, height: `calc(2 * ${height})` }} />
      <span
        className={classes.Light3}
        style={{ width: `calc(2 * ${height})`, borderBottomRightRadius: height, borderTopLeftRadius: height }}
      />
    </div>
  );
};

export default Light;
