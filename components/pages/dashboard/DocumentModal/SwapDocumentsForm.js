"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./DocumentModal.module.scss";

import Form, { FormCol, FormRow } from "@/components/Elements/Form/Form";
import Button from "@/components/Elements/Button/Button";
import queryString from "query-string";
import { GlobalErrorContext } from "@/store/error-context";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import { join } from "@/utils/helper";
import UpIcon from "@/components/Elements/Icons/UpIcon";
import DownIcon from "@/components/Elements/Icons/DownIcon";
import { startProgress, stopProgress } from "next-nprogress-bar";

const SwapDocumentsForm = ({
  hideModal,
  isDisabled,
  setIsDisabled,

  document,
  setDocument,
  collectionData,
  childCollectionData,
  fetchCollection,
}) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const swaps = useRef([]);

  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch documents and sort them
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDisabled(true);

      // Fetch documents
      const url = queryString.stringifyUrl({
        url: `/api/${childCollectionData.name}`,
        query: {
          _id: document[childCollectionData.name],
          limit: 50,
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

      const orderedCollection = document[childCollectionData.name].map((id) =>
        resData.data[childCollectionData.name].find((doc) => doc._id === id)
      );

      setCollection(orderedCollection);
      setDocument((doc) => ({ ...doc, [childCollectionData.name]: orderedCollection }));
    };

    fetchData();
  }, [childCollectionData, document, setDocument, hideModal, setIsDisabled, setGlobalError]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    startProgress();
    setIsDisabled(true);

    const res = await fetch(`/api/${collectionData.name}/${document._id}/swap-${childCollectionData.name}-indices`, {
      method: "PATCH",
      body: JSON.stringify({
        swaps: swaps.current,
      }),
    });
    const resData = await res.json();

    stopProgress();

    // Handle error
    if (!res.ok) {
      setIsDisabled(false);
      return setGlobalError(resData.message);
    }

    // Handle success
    setDocument((p) => {
      const obj = { ...p };
      obj[childCollectionData.name] = collection.map((doc) => doc._id);
      return obj;
    });

    hideModal();
    fetchCollection();
  };

  const onSwapHandler = (index, change) => {
    if (index + change < 0) return;
    if (index + change >= collection.length) return;

    const swap = [index, index + change];

    if (
      swaps.current.length > 0 &&
      swap[0] === swaps.current[swaps.current.length - 1][1] &&
      swap[1] === swaps.current[swaps.current.length - 1][0]
    ) {
      swaps.current.pop();
    } else {
      swaps.current.push(swap);
    }

    setCollection((p) => {
      const arr = [...p];
      const b = arr[index];
      arr[index] = arr[index + change];
      arr[index + change] = b;
      return arr;
    });
  };

  return (
    <Form className={join(classes.Form, classes.SwapForm)} onSubmit={onSubmitHandler}>
      <FormRow className={classes.SwapFormContainer}>
        <FormCol className={classes.Documents}>
          {isLoading && !collection && <LoaderBlock />}

          {collection?.length > 0 &&
            collection.map((doc, i) => (
              <div key={doc._id} className={classes.Document} tabIndex={0}>
                <div className={classes.DocumentName}>{doc.name}</div>
                <div className={classes.DocumentActions}>
                  <Button
                    className={classes.DocumentButton}
                    styleName="icon"
                    size="small"
                    type="button"
                    onClick={() => onSwapHandler(i, -1)}
                  >
                    <UpIcon />
                  </Button>
                  <Button
                    className={classes.DocumentButton}
                    styleName="icon"
                    size="small"
                    type="button"
                    onClick={() => onSwapHandler(i, 1)}
                  >
                    <DownIcon />
                  </Button>
                </div>
              </div>
            ))}
        </FormCol>
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

export default SwapDocumentsForm;
