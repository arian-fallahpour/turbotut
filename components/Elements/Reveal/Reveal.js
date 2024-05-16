"use client";

import { join } from "@/utils/helper";
import classes from "./Reveal.module.scss";
import { useEffect, useRef, useState } from "react";

const Reveal = ({
  revealed,
  className,
  children,
  style,
  innerProps = {},
  ...otherProps
}) => {
  // const [height, setHeight] = useState(0);
  // const ref = useRef(null);

  // useEffect(() => {
  //   setHeight(revealed ? ref.current.offsetHeight : 0);
  // }, [revealed]);

  return (
    <div
      className={join(
        className,
        classes.Outer,
        revealed ? classes.revealed : null
      )}
      // style={{ ...style, height, transition: "height 0.5s ease" }}
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
