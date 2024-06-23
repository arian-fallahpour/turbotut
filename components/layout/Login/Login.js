"use client";

import React from "react";
import classes from "./Login.module.scss";
import { signIn } from "next-auth/react";
import { startProgress } from "next-nprogress-bar";

import Button from "@/components/Elements/Button/Button";
import LogoGoogle from "@/public/images/logos/LogoGoogle";
import LogoGithub from "@/public/images/logos/LogoGithub";

import CloseIcon from "@/components/Elements/Icons/CloseIcon";

const Login = ({ onExit }) => {
  return (
    <div className={classes.Login}>
      <div className={classes.LoginHeader}>
        <h2 className="header header-section text-center">login</h2>
        <Button className={classes.LoginExit} styleName="transparent" variantName="orange" onClick={onExit}>
          <CloseIcon />
        </Button>
      </div>

      <p className="paragraph">Log in instantly with:</p>
      <Button
        className={classes.LoginButton}
        styleName="glass"
        onClick={() => {
          startProgress();
          signIn("google");
        }}
      >
        <LogoGoogle />
        Google
      </Button>
      <Button
        className={classes.LoginButton}
        styleName="glass"
        onClick={() => {
          startProgress();
          signIn("github");
        }}
      >
        <LogoGithub />
        GitHub
      </Button>
    </div>
  );
};

export default Login;
