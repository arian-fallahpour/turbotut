"use client";

import React, { useContext } from "react";
import classes from "./NavProfile.module.scss";
import { LoginContext } from "@/store/login-context";
import Button from "@/components/Elements/Button/Button";
import Link from "next/link";
import Image from "next/image";

const NavProfile = ({ user }) => {
  const { setVisibility } = useContext(LoginContext);

  const showLoginHandler = () => {
    setVisibility(true);
  };

  return (
    <div className={classes.NavProfile}>
      {user ? (
        <Link className={classes.NavProfileButton} href="/profile">
          <Image alt={user.name} src={user.image} fill />
        </Link>
      ) : (
        <Button styleName="fill" onClick={showLoginHandler}>
          login
        </Button>
      )}
      {user?.subscription === "premium" && (
        <div className={classes.NavProfileSubscribed}>premium</div>
      )}
    </div>
  );
};

export default NavProfile;
