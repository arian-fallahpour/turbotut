import React, { Fragment } from "react";
import Background from "../Background/Background";
import Nav from "@/components/layout/Nav/Nav";
import Login from "@/components/layout/Login/Login";
import Footer from "@/components/layout/Footer/Footer";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Page = async ({ children, background = "main", absoluteNav = false }) => {
  const session = await getServerSession(options);

  return (
    <Fragment>
      <Nav user={session.user} isAbsolute={absoluteNav} />
      <main className="main">{children}</main>
      <Footer />
      <Login />
      <Background style={background} />
    </Fragment>
  );
};

export default Page;
