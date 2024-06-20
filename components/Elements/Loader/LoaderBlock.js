import React from "react";
import classes from "./Loader.module.scss";

import Loader from "./Loader";

const LoaderBlock = () => {
  return (
    <div className={classes.LoaderBlock}>
      <Loader />
    </div>
  );
};

export default LoaderBlock;
