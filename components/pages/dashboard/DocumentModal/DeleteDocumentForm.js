"use client";

import React, { useContext, useState } from "react";
import classes from "./DocumentModal.module.scss";
import { toSingular } from "@/utils/helper";

import Button from "@/components/Elements/Button/Button";
import Form, { FormRow } from "@/components/Elements/Form/Form";
import Input from "@/components/Elements/Input/Input";
import { GlobalErrorContext } from "@/store/error-context";
import { startProgress, stopProgress } from "next-nprogress-bar";
import { useRouter } from "next/navigation";

const DeleteDocumentForm = ({
  hideModal,

  document,
  collectionData,
  fetchCollection = () => {},
  shouldLeavePage,
}) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  const onChangeHandler = (e) => {
    if (e.target.value === document.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    startProgress();
    setIsDisabled(true);

    const res = await fetch(`/api/${collectionData.name}/${document._id}/hard`, { method: "DELETE" });

    stopProgress();

    // Handle errors
    if (!res.ok) {
      setIsDisabled(false);
      const resData = await res.json();
      return setGlobalError(resData.message);
    }

    // Handle success
    if (shouldLeavePage) router.back();
    fetchCollection();
    hideModal();
  };

  return (
    <Form className={classes.Form} onSubmit={onSubmitHandler}>
      <FormRow>
        <p className="paragraph color-red">
          Warning: This will delete this {toSingular(collectionData.name)} and all of its child documents.
        </p>
      </FormRow>

      <FormRow>
        <p className="paragraph">
          Enter the name of this {toSingular(collectionData.name)} (<i>{document.name}</i>) to confirm the deletion.
        </p>
      </FormRow>

      <FormRow>
        <Input label={`name of ${toSingular(collectionData.name)}`} name="" onChange={onChangeHandler} />
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

export default DeleteDocumentForm;
