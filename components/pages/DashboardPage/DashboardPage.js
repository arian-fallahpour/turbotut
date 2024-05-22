import React from "react";
import classes from "./DashboardPage.module.scss";

import Page from "@/components/Elements/Page/Page";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Section from "@/components/Elements/Section/Section";
import Courses from "./Courses/Courses";

const DashboardPage = async ({ panel }) => {
  const session = await getServerSession(options);

  return (
    <Page
      hideNav
      hideFooter
      background="flat"
      session={session}
      requiresSession
      restrictTo={["admin"]}
    >
      <Section limit={null} className={classes.DashboardSection}>
        <div className={classes.DashboardSidebar}></div>
        <div className={classes.DashboardMain}>
          <Courses />
        </div>
      </Section>
    </Page>
  );
};

export default DashboardPage;
