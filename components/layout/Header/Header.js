import React from "react";
import classes from "./Header.module.scss";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";
import EastIcon from "@/components/Elements/Icons/EastIcon";

const Header = () => {
  return (
    <header className={classes.Header}>
      <span className={classes.HeaderGrid} />
      <div className={classes.HeaderContent}>
        <h1 className={join("header", "header-title", classes.HeaderTitle)}>
          <span className="color-orange effect-speed">Accelerate</span>
          <span className="color-metal">your learning</span>
        </h1>
        <p className="paragraph">
          Easily learn entire high school subjects in only{" "}
          <span className="color-red underline-fancy">one sitting!</span>
        </p>
        <Button styleName="shiny">
          Get Started
          <EastIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
