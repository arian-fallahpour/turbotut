"use client";

import React, { useContext } from "react";
import { GlobalErrorContext } from "@/store/error-context";
import classes from "./GlobalError.module.scss";
import { join } from "@/utils/helper";

import ErrorIcon from "../Icons/ErrorIcon";

const GlobalError = () => {
  const { visible, globalError } = useContext(GlobalErrorContext);

  return (
    <div
      className={join(classes.GlobalError, visible ? classes.visible : null)}
    >
      <div className={classes.GlobalErrorIcon}>
        <ErrorIcon />
      </div>
      <div className={classes.GlobalErrorMessage}>{globalError}</div>
    </div>
  );
};

export default GlobalError;
