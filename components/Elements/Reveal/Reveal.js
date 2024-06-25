"use client";

import { join } from "@/utils/helper";
import classes from "./Reveal.module.scss";

const Reveal = ({ children, revealed, className, direction = "vertical", innerProps = {}, ...otherProps }) => {
  return (
    <div
      className={join(className, classes.Outer, classes[`Outer--${direction}`], revealed ? classes.revealed : null)}
      {...otherProps}
    >
      <div {...innerProps} className={join(classes.Inner, innerProps.className)}>
        {children}
      </div>
    </div>
  );
};

export default Reveal;
