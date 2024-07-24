"use client";

import React, { useContext, useEffect, useState } from "react";
import classes from "./DocumentModal.module.scss";

import Form, { FormCol, FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";
import queryString from "query-string";
import { GlobalErrorContext } from "@/store/error-context";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import { join } from "@/utils/helper";

const SwapDocumentsForm = ({ hideModal, isDisabled, setIsDisabled, document, collectionData, fetchCollection }) => {
  const { setGlobalError } = useContext(GlobalErrorContext);

  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = () => {};

  // Fetch documents and sort them
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDisabled(true);

      // Fetch documents
      const url = queryString.stringifyUrl({
        url: `/api/${collectionData.name}`,
        query: {
          _id: document[collectionData.name],
        },
      });

      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      const resData = await res.json();

      setIsLoading(false);
      setIsDisabled(false);

      // Handle error
      if (!res.ok) {
        hideModal();
        return setGlobalError(resData.message);
      }

      const orderedCollection = document[collectionData.name].map((id) =>
        resData.data[collectionData.name].find((doc) => doc._id === id)
      );

      setCollection(orderedCollection);
    };

    fetchData();
  }, [collectionData, document, hideModal, setGlobalError]);

  return (
    <Form className={join(classes.DocumentModalForm, classes.SwapDocumentsForm)} onSubmit={onSubmitHandler}>
      <FormRow className={classes.SwapDocumentsFormDocuments}>
        <FormCol>
          {isLoading && !collection && <LoaderBlock />}
          {collection?.length > 0 && collection.map((doc) => <div key={doc._id}>{doc.name}</div>)}
        </FormCol>
      </FormRow>

      <FormRow className={classes.DocumentModalActions}>
        <Button styleName="glass" variantName="red" type="button" onClick={() => hideModal()}>
          cancel
        </Button>
        <Button isDisabled={isDisabled}>confirm</Button>
      </FormRow>
    </Form>
  );
};

export default SwapDocumentsForm;
