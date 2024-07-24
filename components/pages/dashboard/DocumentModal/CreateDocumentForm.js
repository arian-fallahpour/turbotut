"use client";

import React from "react";
import classes from "./DocumentModal.module.scss";
import Form, { FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";
import { startProgress, stopProgress } from "next-nprogress-bar";
import DocumentModalInput from "./DocumentModalInput";
import { useForm } from "@/hooks/use-form";

const CreateDocumentForm = ({
  isDisabled,
  setIsDisabled,
  hideModal,

  defaultValues,
  collectionData,
  fetchCollection = () => {},
}) => {
  const { inputErrors, setInputData, setGlobalError, setInputErrors, appendInputDataToForm } = useForm();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const fetchCreateRequest = async () => {
      const formData = new FormData(e.target);
      appendInputDataToForm(formData);

      startProgress();
      setIsDisabled(true);

      const res = await fetch(`/api/${collectionData.name}/create-by-form`, {
        method: "POST",
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
      fetchCollection();
    };

    fetchCreateRequest();
  };

  return (
    <Form className={classes.DocumentModalForm} onSubmit={onSubmitHandler}>
      {collectionData.editableFields.map((field) => (
        <DocumentModalInput
          key={field.name}
          defaultValues={defaultValues}
          field={field}
          error={inputErrors[field.name] || null}
          setFormValue={setInputData}
        />
      ))}

      <FormRow className={classes.DocumentModalActions}>
        <Button styleName="glass" variantName="red" type="button" onClick={() => hideModal()}>
          cancel
        </Button>
        <Button isDisabled={isDisabled}>confirm</Button>
      </FormRow>
    </Form>
  );
};

export default CreateDocumentForm;
