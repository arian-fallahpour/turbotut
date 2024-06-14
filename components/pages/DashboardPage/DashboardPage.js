import React from "react";
import classes from "./DashboardPage.module.scss";

import Page from "@/components/Elements/Page/Page";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Section from "@/components/Elements/Section/Section";
import CoursesPanel from "./CoursesPanel/CoursesPanel";
import Sidebar from "./Sidebar/Sidebar";
import ChaptersPanel from "./ChaptersPanel/ChaptersPanel";

const DashboardPage = async ({ panel }) => {
  const session = await getServerSession(options);

  let panelElement;
  if (panel === "courses") {
    panelElement = <CoursesPanel />;
  } else if (panel === "chapters") {
    panelElement = <ChaptersPanel />;
  } else if (panel === "lectures") {
  } else {
    panelElement = <CoursesPanel />;
  }

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
        <Sidebar />
        <div className={classes.DashboardMain}>{panelElement}</div>
      </Section>
    </Page>
  );
};

export default DashboardPage;
