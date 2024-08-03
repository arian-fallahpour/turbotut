"use client";

import React, { useContext, useMemo } from "react";
import classes from "./Collection.module.scss";

import TableControls from "@/components/Elements/Table/TableControls";

import { toSingular } from "@/utils/helper";
import { TableButtonRounded } from "@/components/Elements/Table/Table";
import { ModalContext } from "@/store/modal-context";
import DocumentModal from "../DocumentModal/DocumentModal";
import CreateDocumentForm from "../DocumentModal/CreateDocumentForm";
import AddIcon from "@/components/Elements/Icons/AddIcon";
import SwapIcon from "@/components/Elements/Icons/SwapIcon";
import { DocumentPageContext } from "@/store/document-page-context";
import SwapDocumentsForm from "../DocumentModal/SwapDocumentsForm";
import { getActionsMap, getCollectionData } from "@/app/data/dashboard/collections";
import queryString from "query-string";
import { GlobalErrorContext } from "@/store/error-context";
import { startProgress, stopProgress } from "next-nprogress-bar";

const CollectionHeader = ({
  collectionData,
  collection,
  page,
  setPage,
  limit,
  onNextPage,
  onPrevPage,
  fetchCollection,
  isSwappable,
  useParams,
}) => {
  const { showModal } = useContext(ModalContext);
  const { document, setDocument } = useContext(DocumentPageContext);
  const { setGlobalError } = useContext(GlobalErrorContext);

  const actionsMap = useMemo(() => getActionsMap(collectionData.actions), [collectionData.actions]);

  const createDocumentHandler = () => {
    // Only works with one parent field
    const parentField = collectionData.editableFields.find((field) => field.isParent);
    const defaultValues = {};
    if (parentField && document)
      defaultValues[parentField.name] = { _id: document._id, name: document[parentField.path] };

    showModal(
      <DocumentModal
        title={`Create ${toSingular(collectionData.name)}`}
        FormElement={CreateDocumentForm}
        formProps={{
          defaultValues,
          collectionData,
          fetchCollection,
        }}
      />
    );
  };

  const swapDocumentsHandler = async () => {
    const parentCollectionData = getCollectionData(collectionData.parentCollection);

    const url = queryString.stringifyUrl({
      url: `/api/${parentCollectionData.name}/${document._id}`,
      query: {
        select: "lectures",
      },
    });

    startProgress();

    // Find updated child documents
    const res = await fetch(url);
    const resData = await res.json();

    stopProgress();

    // Handle error
    if (!res.ok) {
      return setGlobalError(resData.message);
    }

    const childDocuments = resData.data[toSingular(parentCollectionData.name)][collectionData.name];

    showModal(
      <DocumentModal
        title={`Swap ${collectionData.name}`}
        FormElement={SwapDocumentsForm}
        formProps={{
          document: {
            ...document,
            [collectionData.name]: childDocuments,
          },
          setDocument,
          collectionData: parentCollectionData,
          childCollectionData: collectionData,
          fetchCollection,
        }}
      />
    );
  };

  const notFirstPage = page > 1;
  const notLastPage = collection && page * limit < collection.totalResults;

  return (
    <div className={classes.CollectionHeader}>
      <h2 className="header header-section">{collectionData.name}</h2>
      <div className={classes.CollectionActions}>
        {collection && collection.docs.length > 0 && (
          <TableControls
            page={page}
            setPage={setPage}
            limit={limit}
            totalResults={collection.totalResults}
            isPrevDisabled={!notFirstPage}
            isNextDisabled={!notLastPage}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            useParams={useParams}
          />
        )}

        {isSwappable && (
          <TableButtonRounded styleName="glass" variantName="white" onClick={swapDocumentsHandler}>
            <SwapIcon />
          </TableButtonRounded>
        )}
        {!!actionsMap.create && (
          <TableButtonRounded styleName="glass" variantName="white" onClick={createDocumentHandler}>
            <AddIcon />
          </TableButtonRounded>
        )}
      </div>
    </div>
  );
};

export default CollectionHeader;
