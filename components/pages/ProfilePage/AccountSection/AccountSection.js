import Section from "@/components/Elements/Section/Section";
import React from "react";
import classes from "./AccountSection.module.scss";
import Image from "next/image";
import Form, { FormCol } from "@/components/Elements/Form/Form";
import Input from "@/components/Elements/Input/Input";
import Button from "@/components/Elements/Button/Button";

const AccountSection = ({ limit }) => {
  return (
    <Section className={classes.AccountSection} limit={limit}>
      <Form className={classes.Form}>
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
            <span className={classes.PictureOverlay} />
            <label htmlFor="input-image" className={classes.PictureLabel}>
              Change
            </label>
          </div>
        </FormCol>
        <FormCol className={classes.FormMain}>
          <h2 className="header header-section">edit profile</h2>
          <Input type="text" name="firstName" label="first name" />
          <Input type="text" name="lastName" label="last name" />
          <Button className={classes.FormSubmit}>update</Button>
        </FormCol>
      </Form>
    </Section>
  );
};

export default AccountSection;
