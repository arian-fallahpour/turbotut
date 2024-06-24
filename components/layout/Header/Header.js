import React from "react";
import classes from "./Header.module.scss";
import Button from "@/components/Elements/Button/Button";

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1 className="header header-title">
        <span className="color-orange effect-speed">Accelerate</span>
        <span className="color-metal">your learning</span>
      </h1>
      <p className="paragraph">
        Easily learn entire high school subjects in only <span className="color-red underline-fancy">one sitting!</span>
      </p>
      <Button styleName="shiny">Get Started</Button>
    </header>
  );
};

export default Header;
