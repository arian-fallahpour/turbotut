import classes from "@/components/pages/dashboard/Dashboard.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Sidebar from "@/components/pages/dashboard/Sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Layout({ children }) {
  const session = await getServerSession(options);

  return (
    <Page
      background="flat"
      hideNav
      hideFooter
      session={session}
      requiresSession
      restrictTo={["admin"]}
    >
      <Section limit={null} className={classes.DashboardSection}>
        <Sidebar />
        {children}
      </Section>
    </Page>
  );
}
