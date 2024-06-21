import React, { useContext, useState } from "react";
import classes from "./DocumentModal.module.scss";
import { toSingular } from "@/utils/helper";

import Button from "@/components/Elements/Button/Button";
import Form, { FormRow } from "@/components/Elements/Form/Form";
import Input from "@/components/Elements/Input/Input";
import { GlobalErrorContext } from "@/store/error-context";
import { startProgress, stopProgress, useRouter } from "next-nprogress-bar";

const DeleteDocumentForm = ({
  hideModal,
  document,
  collectionData,
  cancelHandler,
}) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const onChangeHandler = (e) => {
    if (e.target.value === document.name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const fetchDeleteRequest = async () => {
      startProgress();
      setDisabled(true);

      const res = await fetch(
        `/api/${collectionData.name}/${document._id}/hard`,
        { method: "DELETE" }
      );

      stopProgress();

      if (!res.ok) {
        const resData = await res.json();
        setGlobalError(new Error(resData.message));
        setDisabled(false);
      } else {
        router.back();
      }
    };

    fetchDeleteRequest();
  };

  return (
    <Form className={classes.DocumentModalForm} onSubmit={onSubmitHandler}>
      <FormRow>
        <p className="paragraph color-red">
          Warning: This will delete this {toSingular(collectionData.name)} and
          all of its child documents.
        </p>
      </FormRow>

      <FormRow>
        <p className="paragraph">
          Enter the name of this {toSingular(collectionData.name)} (
          <i>{document.name}</i>) to confirm the deletion.
        </p>
      </FormRow>

      <FormRow>
        <Input
          label={`name of ${toSingular(collectionData.name)}`}
          name=""
          onChange={onChangeHandler}
        />
      </FormRow>

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

export default DeleteDocumentForm;
