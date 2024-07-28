import React, { Fragment } from "react";

import Background from "../Background/Background";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import Modal from "../Modal/Modal";
import GlobalError from "../GlobalError/GlobalError";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { requiresSession, restrictTo } from "@/utils/authentication";

const Page = async ({
  children,
  background = "main",
  absoluteNav = false,
  hideNav = false,
  hideFooter = false,
  session,
  requiresSession: enforceSession,
  restrictTo: restrictToRoles = [],
}) => {
  if (!session) session = await getServerSession(options);

  let user;
  if (enforceSession) user = await requiresSession(session);
  if (restrictToRoles && restrictToRoles.length > 0) restrictTo(user, restrictToRoles);

  return (
    <Fragment>
      <GlobalError />
      {!hideNav && <Nav user={session?.user} isAbsolute={absoluteNav} />}
      <main className="main">{children}</main>
      {!hideFooter && <Footer />}
      <Modal />
      <Background style={background} />
    </Fragment>
  );
};

export default Page;
