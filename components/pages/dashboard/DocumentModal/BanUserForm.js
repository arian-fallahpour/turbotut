"use client";

import React, { useContext, useState } from "react";
import classes from "./DocumentModal.module.scss";
import { GlobalErrorContext } from "@/store/error-context";
import { startProgress, stopProgress } from "next-nprogress-bar";

import Form, { FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";

const BanUserForm = ({ hideModal, user, setUser = () => {} }) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    startProgress();
    setIsDisabled(true);

    const res = await fetch(`/api/users/${user._id}/toggle-ban`, { method: "PATCH" });
    const resData = await res.json();

    stopProgress();

    // Handle errors
    if (!res.ok) {
      setIsDisabled(false);
      return setGlobalError(resData.message);
    }

    // Handle success
    setUser((p) => ({ ...p, isBanned: resData.data.user.isBanned }));
    hideModal();
  };

  return (
    <Form className={classes.Form} onSubmit={onSubmitHandler}>
      <FormRow>
        <p className="paragraph color-red text-center">
          Are you sure you want to {user.isBanned ? "unban" : "ban"} {user.firstName} {user.lastName}?
        </p>
      </FormRow>

      {!user.isBanned && (
        <FormRow>
          <p className="paragraph">
            This will log them out the next time they load a page, and prevent them from accessing anything on this
            website.
          </p>
        </FormRow>
      )}

      <FormRow>
        <p className="paragraph">You will be able to {user.isBanned ? "ban" : "unban"} them if needed</p>
      </FormRow>

      <FormRow className={classes.FormActions}>
        <Button styleName="glass" variantName="red" type="button" onClick={() => hideModal()}>
          cancel
        </Button>
        <Button isDisabled={isDisabled}>confirm</Button>
      </FormRow>
    </Form>
  );
};

export default BanUserForm;
