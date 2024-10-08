"use client";

import React from "react";
import classes from "./AccountSection.module.scss";

import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";
import { signOut } from "next-auth/react";
import { startProgress } from "next-nprogress-bar";
import Image from "next/image";

const AccountSection = ({ className, limit, user }) => {
  return (
    <Section className={join(className, classes.AccountSection)} limit={limit}>
      <div className={classes.Account}>
        <div className={classes.AccountSidebar}>
          <div className={classes.AccountImage}>
            <Image alt="change profile picture" src={user.picture} fill />
          </div>
        </div>
        <div className={classes.AccountContent}>
          <h2 className="header header-section">Profile</h2>
          <div className={classes.AccountData}>
            <span className={classes.AccountDataLeft}>email:</span>
            <span className={classes.AccountDataRight}>{user.email}</span>
          </div>
          <div className={classes.AccountData}>
            <span className={classes.AccountDataLeft}>first name:</span>
            <span className={classes.AccountDataRight}>{user.firstName}</span>
          </div>
          <div className={classes.AccountData}>
            <span className={classes.AccountDataLeft}>last name:</span>
            <span className={classes.AccountDataRight}>{user.lastName}</span>
          </div>
          <p className="paragraph text-center">Your account data is linked to your login provider</p>
          <Button
            className={classes.AccountSignout}
            styleName="shiny"
            variantName="orange"
            onClick={() => {
              startProgress();
              signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default AccountSection;
