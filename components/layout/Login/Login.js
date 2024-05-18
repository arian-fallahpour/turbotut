"use client";

import { signIn } from "next-auth/react";

import React, { Fragment, useContext } from "react";
import classes from "./Login.module.scss";

import Button from "@/components/Elements/Button/Button";

import { LoginContext } from "@/store/login-context";
import { join } from "@/utils/helper";
import LogoGoogle from "@/public/images/logos/LogoGoogle";
import LogoGithub from "@/public/images/logos/LogoGithub";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
          <Button
            className={classes.LoginExit}
            styleName="nav"
            variantName="orange"
            onClick={exitHandler}
          >
            <CloseRoundedIcon fontSize="inherit" />
          </Button>
        </div>
        <p className="paragraph">Log in instantly with:</p>
        <Button
          className={classes.LoginButton}
          styleName="glass"
          onClick={() => signIn("google")}
        >
          <LogoGoogle />
          Google
        </Button>
        <Button
          className={classes.LoginButton}
          styleName="glass"
          onClick={() => signIn("github")}
        >
          <LogoGithub />
          GitHub
        </Button>
      </div>
    </Fragment>
  );
};

export default Login;
