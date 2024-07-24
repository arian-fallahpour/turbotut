"use client";

import React, { useContext } from "react";
import classes from "./Actions.module.scss";
import Button from "@/components/Elements/Button/Button";

import MoreIcon from "@/components/Elements/Icons/MoreIcon";

import { getCollectionData } from "@/app/data/dashboard/collections";
import DocumentModal from "../DocumentModal/DocumentModal";
import EditDocumentForm from "../DocumentModal/EditDocumentForm";
import { ModalContext } from "@/store/modal-context";
import { toSingular } from "@/utils/helper";
import DeleteDocumentForm from "../DocumentModal/DeleteDocumentForm";
import CreateDocumentForm from "../DocumentModal/CreateDocumentForm";
import { startProgress, stopProgress } from "next-nprogress-bar";
import { GlobalErrorContext } from "@/store/error-context";
import queryString from "query-string";

const Actions = ({ document, collectionName, fetchCollection }) => {
  const { showModal } = useContext(ModalContext);
  const { setGlobalError } = useContext(GlobalErrorContext);

  const collectionData = getCollectionData(collectionName);

  const editDocumentHandler = async () => {
    startProgress();

    const url = queryString.stringifyUrl({
      url: `/api/${collectionData.name}/${document._id}`,
      query: {
        select: collectionData.editableFields.map((field) => field.name).join(","),
      },
    });

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const resData = await res.json();

    stopProgress();

    // Handle error
    if (!res.ok) {
      return setGlobalError(resData.message);
    }

    // Handle success
    showModal(
      <DocumentModal
        title={`Edit ${toSingular(collectionData.name)}`}
        FormElement={EditDocumentForm}
        formProps={{
          defaultValues: resData.data[toSingular(collectionData.name)],
          collectionData,
        }}
      />
    );
  };

  const deleteDocumentHandler = () => {
    showModal(
      <DocumentModal
        title={`Delete ${toSingular(collectionData.name)}`}
        FormElement={DeleteDocumentForm}
        formProps={{
          document,
          collectionData,
          fetchCollection,
        }}
      />
    );
  };

  const createChildDocumentHandler = (actionCollectionName) => {
    const childCollectionData = getCollectionData(actionCollectionName);

    const parentField = childCollectionData.editableFields.find((field) => field.isParent);
    const defaultValues = {};
    if (parentField && document)
      defaultValues[parentField.name] = { _id: document._id, name: document[parentField.path] };

    showModal(
      <DocumentModal
        title={`Create ${toSingular(actionCollectionName)}`}
        FormElement={CreateDocumentForm}
        formProps={{
          defaultValues,
          collectionData: childCollectionData,
          fetchCollection,
        }}
      />
    );
  };

  const onClickHandler = (action) => {
    if (action.type === "edit") {
      editDocumentHandler();
    } else if (action.type === "delete") {
      deleteDocumentHandler();
    } else if (action.type === "insert") {
      createChildDocumentHandler(action.collection);
    }
  };

  return (
    <div className={classes.Actions}>
      <Button className={classes.ActionsButton} styleName="glass" variantName="white">
        <MoreIcon />
      </Button>
      <div className={classes.ActionsList}>
        {collectionData.actions?.length > 0 &&
          collectionData.actions.map((action, i) => (
            <li className={classes.ActionsListItem} key={i}>
              <Button
                styleName="glass"
                variantName={action.type === "delete" ? "red" : "white"}
                size="small"
                onClick={() => onClickHandler(action)}
              >
                {action.label}
              </Button>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Actions;
