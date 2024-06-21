"use client";

import React, { useContext, useState } from "react";
import classes from "./DocumentModal.module.scss";
import Form, { FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";
import { startProgress, stopProgress } from "next-nprogress-bar";
import DocumentModalInput from "./DocumentModalInput";
import { GlobalErrorContext } from "@/store/error-context";

const CreateDocumentForm = ({
  disabled,
  setDisabled,
  cancelHandler,
  hideModal,
  document,
  collectionData,
  fetchCollection,
}) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const [otherFields, setOtherFields] = useState({});
  const [errors, setErrors] = useState({});

  const setOtherField = (label, value) => {
    setOtherFields((p) => ({ ...p, [label]: value }));
  };

  const setError = (field, message) => {
    setErrors((p) => ({ ...p, [field]: message }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const fetchCreateRequest = async () => {
      const formData = new FormData(e.target);
      Object.keys(otherFields).forEach((key) =>
        formData.append(key, otherFields[key])
      );

      startProgress();
      setDisabled(true);

      const res = await fetch(`/api/${collectionData.name}/create-by-form`, {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();

      stopProgress();

      if (!res.ok) {
        console.log(resData.errors);

        if (resData.errors) {
          Object.keys(resData.errors).forEach((key, i) =>
            setError(key, resData.errors[key])
          );
        } else {
          setGlobalError(resData.message);
        }

        setDisabled(false);
      } else {
        hideModal();
        fetchCollection();
      }
    };

    fetchCreateRequest();
  };

  return (
    <Form className={classes.DocumentModalForm} onSubmit={onSubmitHandler}>
      {collectionData.editableFields.map((field) => {
        return (
          <DocumentModalInput
            key={field.name}
            document={document}
            field={field}
            error={errors[field.name] ? errors[field.name] : null}
            setOtherField={setOtherField}
            setDefault={field.isParentId}
          />
        );
      })}

      <FormRow className={classes.DocumentModalActions}>
        <Button
          styleName="glass"
          variantName="red"
          type="button"
          onClick={cancelHandler}
        >
          cancel
        </Button>
        <Button isDisabled={disabled}>confirm</Button>
      </FormRow>
    </Form>
  );
};

export default CreateDocumentForm;
