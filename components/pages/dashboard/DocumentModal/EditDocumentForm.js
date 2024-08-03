"use client";

import React from "react";
import classes from "./DocumentModal.module.scss";
import Form, { FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";
import { startProgress, stopProgress } from "next-nprogress-bar";
import { toSingular } from "@/utils/helper";
import DocumentModalInput from "./DocumentModalInput";
import { useForm } from "@/hooks/use-form";

const EditDocumentForm = ({
  isDisabled,
  setIsDisabled,
  hideModal,

  defaultValues,
  setDocument = () => {},
  collectionData,
  fetchCollection = async () => {},
}) => {
  const { inputErrors, setGlobalError, setInputErrors, setInputData, appendInputDataToForm } = useForm();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    appendInputDataToForm(formData);

    startProgress();
    setIsDisabled(true);

    const res = await fetch(`/api/${collectionData.name}/${defaultValues._id}/edit-by-form`, {
      method: "PATCH",
      body: formData,
    });
    const resData = await res.json();

    stopProgress();

    // Handle errors
    if (!res.ok) {
      setIsDisabled(false);

      if (resData.errors) {
        setInputErrors(resData.errors);
      } else {
        setGlobalError(resData.message);
      }

      return;
    }

    // Handle success
    hideModal();

    // Problem: may not select all viewable fields
    setDocument(resData.data[toSingular(collectionData.name)]);
    await fetchCollection();
  };

  return (
    <Form className={classes.Form} onSubmit={onSubmitHandler}>
      {collectionData.editableFields.map((field) => (
        <DocumentModalInput
          key={field.name}
          defaultValues={defaultValues}
          field={field}
          error={inputErrors[field.name] || null}
          collectionData={collectionData}
          setFormValue={setInputData}
        />
      ))}

      <FormRow className={classes.FormActions}>
        <Button styleName="glass" variantName="red" type="button" onClick={() => hideModal()}>
          cancel
        </Button>
        <Button isDisabled={isDisabled}>confirm</Button>
      </FormRow>
    </Form>
  );
};

export default EditDocumentForm;
