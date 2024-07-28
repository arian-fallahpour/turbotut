"use client";

import React, { useContext, useEffect } from "react";
import classes from "./NavProfile.module.scss";

import Button from "@/components/Elements/Button/Button";
import Link from "next/link";
import Image from "next/image";
import { ModalContext } from "@/store/modal-context";
import Login from "../../Login/Login";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const NavProfile = ({ user }) => {
  const { showModal, hideModal } = useContext(ModalContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const loginHandler = () => {
    showModal(<Login onExit={hideModal} />);
  };

  // If query param "login" is true, show login and remove the param
  useEffect(() => {
    if (searchParams.get("login")) {
      const params = new URLSearchParams(searchParams);
      params.delete("login");

      showModal(<Login onExit={hideModal} />);
      router.replace(pathname + (params.toString() ? "?" + params.toString() : ""));
    }
  }, [searchParams, showModal, hideModal, pathname, router]);

  return (
    <div className={classes.NavProfile}>
      {user ? (
        <Link className={classes.NavProfileButton} href="/profile">
          <Image alt={user.firstName} src={user.picture} fill />
        </Link>
      ) : (
        <Button onClick={loginHandler}>login</Button>
      )}
      {user?.subscription === "premium" && <div className={classes.NavProfileSubscribed}>premium</div>}
    </div>
  );
};

export default NavProfile;
