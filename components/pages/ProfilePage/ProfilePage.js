import Page from "@/components/Elements/Page/Page";
import classes from "./ProfilePage.module.scss";
import React from "react";
import AccountSection from "./AccountSection/AccountSection";

const SettingsPage = () => {
  const sectionLimit = "70rem";

  return (
    <Page>
      <header className={classes.Header}>
        <h1 className="header header-title text-center color-orange">
          profile
        </h1>
      </header>
      <AccountSection limit={sectionLimit} />
    </Page>
  );
};

export default SettingsPage;
