"use client";

import React, { useEffect, useState } from "react";
import classes from "./ErrorBlock.module.scss";
import { join } from "@/utils/helper";

import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const ErrorBlock = ({
  className,
  message,
  layout = "row",
  type = "error",
  hideGradient,
  ...otherProps
}) => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => setShowIcon(true), []); // prevents weird hydration error

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
        {showIcon && (
          <div className={classes.ErrorBlockIcon}>
            {type === "error" && <ErrorRoundedIcon fontSize="inherit" />}
            {type === "info" && <InfoRoundedIcon fontSize="inherit" />}
          </div>
        )}
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
