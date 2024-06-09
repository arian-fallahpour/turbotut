import React, { Fragment } from "react";
import Background from "../Background/Background";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  requiresSession as enforeSessionOnly,
  restrictTo as restrictToRoles,
} from "@/utils/authentication";
import Modal from "../Modal/Modal";
import GlobalError from "../GlobalError/GlobalError";
import Head from "next/head";
import business from "@/data/business";

const Page = async ({
  children,
  title,
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

  let pageTitle = business.name;
  if (title) pageTitle += ` - ${title}`;

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
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
