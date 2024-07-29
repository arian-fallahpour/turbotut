"use client";

import classes from "./Table.module.scss";
import { useEffect, useRef } from "react";
import { join } from "@/utils/helper";

const TableScroll = ({ children, innerProps = {}, ...otherProps }) => {
  const outerRef = useRef();
  const innerRef = useRef();

  // Autoscroll effect
  useEffect(() => {
    const widthDiff = innerRef.current.offsetWidth - outerRef.current.offsetWidth;
    if (widthDiff <= 0) return;

    let scrollX = 0;
    let interval, timeout;
    const increment = 1;
    const waitDuration = 500;
    const intervalDuration = 50;

    const autoScroll = () => {
      if (widthDiff - scrollX > 0) {
        scrollX += increment;
        if (innerRef.current) innerRef.current.style.marginLeft = `-${scrollX}px`;
      } else {
        scrollX = 0;
        clearInterval(interval);
        timeout = setTimeout(() => {
          if (innerRef.current) innerRef.current.style.marginLeft = `0px`;

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            interval = setInterval(autoScroll, intervalDuration);
          }, waitDuration);
        }, waitDuration);
      }
    };

    timeout = setTimeout(() => {
      interval = setInterval(autoScroll, intervalDuration);
    }, waitDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={classes.TableScroll} ref={outerRef} {...otherProps}>
      <div className={join(innerProps.className, classes.TableScrollInner)} {...innerProps} ref={innerRef}>
        {children}
      </div>
    </div>
  );
};

export default TableScroll;
