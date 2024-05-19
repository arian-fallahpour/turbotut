"use client";

import React, { useContext } from "react";
import classes from "./GlobalError.module.scss";
import { GlobalErrorContext } from "@/store/error-context";

import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { join } from "@/utils/helper";

const GlobalError = () => {
  const { visible, globalError } = useContext(GlobalErrorContext);

  return (
    <div
      className={join(classes.GlobalError, visible ? classes.visible : null)}
    >
      <div className={classes.GlobalErrorIcon}>
        <ErrorRoundedIcon fontSize="inherit" />
      </div>
      <div className={classes.GlobalErrorMessage}>
        {globalError && globalError.message}
      </div>
    </div>
  );
};

export default GlobalError;
