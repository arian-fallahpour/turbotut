"use client";

import { join } from "@/utils/helper";
import classes from "./Reveal.module.scss";

const Reveal = ({
  revealed,
  className,
  children,
  style,
  innerProps = {},
  ...otherProps
}) => {
  return (
    <div
      className={join(
        className,
        classes.Outer,
        revealed ? classes.revealed : null
      )}
      {...otherProps}
    >
      <div
        {...innerProps}
        className={join(classes.Inner, innerProps.className)}
      >
        {children}
      </div>
    </div>
  );
};

export default Reveal;
