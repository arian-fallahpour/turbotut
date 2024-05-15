import React from "react";

import Page from "@/components/Elements/Page/Page";

import DashboardSection from "./DashboardSection/DashboardSection";

const DashboardPage = () => {
  return (
    <Page hideNav hideFooter>
      <DashboardSection />
    </Page>
  );
};

export default DashboardPage;
