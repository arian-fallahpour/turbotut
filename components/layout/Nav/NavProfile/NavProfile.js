"use client";

import React, { useContext } from "react";
import classes from "./NavProfile.module.scss";

import Button from "@/components/Elements/Button/Button";
import Link from "next/link";
import Image from "next/image";
import { ModalContext } from "@/store/modal-context";
import Login from "../../Login/Login";

const NavProfile = ({ user }) => {
  const { showModal, hideModal } = useContext(ModalContext);

  const loginHandler = () => {
    showModal(<Login onExit={hideModal} />);
  };

  return (
    <div className={classes.NavProfile}>
      {user ? (
        <Link className={classes.NavProfileButton} href="/profile">
          <Image alt={user.name} src={user.image} fill />
        </Link>
      ) : (
        <Button onClick={loginHandler}>login</Button>
      )}
      {user?.subscription === "premium" && (
        <div className={classes.NavProfileSubscribed}>premium</div>
      )}
    </div>
  );
};

export default NavProfile;
