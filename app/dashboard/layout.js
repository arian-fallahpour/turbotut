import classes from "@/components/pages/dashboard/Dashboard.module.scss";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Sidebar from "@/components/pages/dashboard/Sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Suspense } from "react";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import Button from "@/components/Elements/Button/Button";
import WestIcon from "@/components/Elements/Icons/WestIcon";
import EastIcon from "@/components/Elements/Icons/EastIcon";

export default async function Layout({ children }) {
  const session = await getServerSession(options);

  return (
    <Page background="flat" hideNav hideFooter session={session} requiresSession restrictTo={["admin"]}>
      <Section limit={null} className={classes.DashboardSection}>
        <Sidebar />
        <div className={classes.Body}>
          <nav className={classes.Nav}>
            <Button className={classes.Back} styleName="icon" isBackButton>
              <WestIcon />
              Back
            </Button>
            <Button className={classes.Back} styleName="icon" isForwardButton>
              Forward
              <EastIcon />
            </Button>
          </nav>
          <main className={classes.Main}>
            <Suspense fallback={<LoaderBlock />}>{children}</Suspense>
          </main>
        </div>
      </Section>
    </Page>
  );
}
