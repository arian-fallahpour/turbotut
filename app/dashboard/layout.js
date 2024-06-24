import classes from "@/components/pages/dashboard/Dashboard.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Sidebar from "@/components/pages/dashboard/Sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Suspense } from "react";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";

export default async function Layout({ children, params }) {
  const session = await getServerSession(options);

  return (
    <Page background="flat" hideNav hideFooter session={session} requiresSession restrictTo={["admin"]}>
      <Section limit={null} className={classes.DashboardSection}>
        <Sidebar />
        <Suspense fallback={<LoaderBlock />}>{children}</Suspense>
      </Section>
    </Page>
  );
}
