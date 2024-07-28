import Page from "@/components/Elements/Page/Page";
import classes from "./ProfilePage.module.scss";
import React from "react";
import AccountSection from "./AccountSection/AccountSection";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SubscriptionSection from "./SubscriptionSection/SubscriptionSection";
import PaymentMethodsSection from "./PaymentMethodsSection/PaymentMethodsSection";
import { requiresSession } from "@/utils/authentication";

const ProfilePage = async () => {
  const session = await getServerSession(options);
  await requiresSession(session);

  const sectionLimit = "70rem";

  return (
    <Page session={session}>
      <div className={classes.ProfileSections}>
        <header className={classes.Header}>
          <h1 className="header header-title text-center color-orange">profile</h1>
        </header>
        <AccountSection className={classes.ProfileSection} limit={sectionLimit} user={session.user} />
        <SubscriptionSection className={classes.ProfileSection} limit={sectionLimit} />
        <PaymentMethodsSection className={classes.ProfileSection} limit={sectionLimit} />
      </div>
    </Page>
  );
};

export default ProfilePage;
