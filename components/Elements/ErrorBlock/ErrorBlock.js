import React from "react";
import classes from "./ErrorBlock.module.scss";
import { join } from "@/utils/helper";

import ErrorIcon from "../Icons/ErrorIcon";
import InfoIcon from "../Icons/InfoIcon";

const ErrorBlock = ({
  className,
  message,
  layout = "row",
  type = "error",
  hideGradient,
  ...otherProps
}) => {
  return (
    <div className={join(className, classes.ErrorBlock)} {...otherProps}>
      <div
        className={join(
          classes.ErrorBlockContainer,
          classes[layout],
          classes[type]
        )}
      >
        {!hideGradient && <span className={classes.ErrorBlockGradient} />}
        <div className={classes.ErrorBlockIcon}>
          {type === "error" && <ErrorIcon fontSize="inherit" />}
          {type === "info" && <InfoIcon fontSize="inherit" />}
        </div>
        <p
          className={join(
            "paragraph",
            "text-center",
            classes.ErrorBlockMessage
          )}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorBlock;
