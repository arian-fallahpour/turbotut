"use client";

import React from "react";
import classes from "./AccountSection.module.scss";

import Section from "@/components/Elements/Section/Section";
// import Image from "next/image";
// import Form, { FormCol, FormRow } from "@/components/Elements/Form/Form";
// import Input from "@/components/Elements/Input/Input";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";
import { signOut } from "next-auth/react";

const AccountSection = ({ className, limit }) => {
  return (
    <Section className={join(className, classes.AccountSection)} limit={limit}>
      {/* Removing for now since not needed */}
      {/* <Form className={classes.Form}>
        <FormRow className={classes.FormContent}>
          <FormCol className={classes.FormSidebar}>
            <div className={classes.Picture}>
              <Image
                className={classes.PictureImage}
                alt="change profile picture"
                src={`/images/courses/default.png`}
                fill
              />
              <input
                type="file"
                id="input-image"
                name="image"
                className={classes.PictureInput}
              />
              <label htmlFor="input-image" className={classes.PictureLabel}>
                Change
              </label>
            </div>
          </FormCol>
          <FormCol className={classes.FormMain}>
            <h2 className="header header-section">edit profile</h2>
            <Input type="text" name="firstName" label="first name" />
            <Input type="text" name="lastName" label="last name" />
          </FormCol>
        </FormRow>
        <FormRow className={classes.FormActions}>
          <Button className={classes.FormSubmit} styleName="shiny">
            update
          </Button>
        </FormRow>
      </Form> */}
      <h2 className="header header-section">profile</h2>
      <div className={classes.Signout}>
        <Button variantName="orange" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </Section>
  );
};

export default AccountSection;
