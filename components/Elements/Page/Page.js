import React, { Fragment } from "react";
import Background from "../Background/Background";
import Nav from "@/components/layout/Nav/Nav";
import Login from "@/components/layout/Login/Login";
import Footer from "@/components/layout/Footer/Footer";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  requiresSession as enforeSessionOnly,
  restrictTo as restrictToRoles,
} from "@/utils/authentication";
import Modal from "../Modal/Modal";

const Page = async ({
  children,
  background = "main",
  absoluteNav = false,
  hideNav = false,
  hideFooter = false,
  session,
  requiresSession,
  restrictTo = [],
}) => {
  if (!session) {
    session = await getServerSession(options);
  }

  if (requiresSession) {
    enforeSessionOnly(session);
  }

  if (restrictTo && restrictTo.length > 0) {
    restrictToRoles(session, restrictTo);
  }

  return (
    <Fragment>
      {!hideNav && <Nav user={session?.user} isAbsolute={absoluteNav} />}
      <main className="main">{children}</main>
      {!hideFooter && <Footer />}
      <Login />
      <Modal />
      <Background style={background} />
    </Fragment>
  );
};

export default Page;
