"use client";

import { signIn } from "next-auth/react";

import React, { Fragment, useContext } from "react";
import classes from "./Login.module.scss";

import Button from "@/components/Elements/Button/Button";

import { LoginContext } from "@/store/login-context";
import { join } from "@/utils/helper";

const Login = () => {
  const { isVisible, setVisibility } = useContext(LoginContext);

  const exitHandler = () => {
    setVisibility(false);
  };

  return (
    <Fragment>
      <div
        className={join(classes.Backdrop, isVisible ? classes.visible : null)}
        onClick={exitHandler}
      />
      <div className={join(classes.Login, isVisible ? classes.visible : null)}>
        <div className={classes.LoginHeader}>
          <h2 className="header header-section text-center">login</h2>
          <Button styleName="nav" variantName="orange" onClick={exitHandler}>
            <i className="material-symbols-rounded">close</i>
          </Button>
        </div>
        <p className="paragraph">Log in instantly with:</p>
        <Button styleName="login" onClick={() => signIn("google")}>
          Google
        </Button>
        <Button styleName="login" onClick={() => signIn("github")}>
          GitHub
        </Button>
      </div>
    </Fragment>
  );
};

export default Login;
