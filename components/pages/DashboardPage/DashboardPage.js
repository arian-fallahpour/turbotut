import React from "react";

import Page from "@/components/Elements/Page/Page";

import DashboardSection from "./DashboardSection/DashboardSection";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const DashboardPage = async () => {
  const session = await getServerSession(options);

  return (
    <Page
      hideNav
      hideFooter
      session={session}
      requiresSession
      restrictTo={["admin"]}
    >
      <DashboardSection />
    </Page>
  );
};

export default DashboardPage;
