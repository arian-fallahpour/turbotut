"use client";

import React, { useContext } from "react";
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
import { getCollectionData } from "@/app/data/dashboard/collections";

const CollectionHeader = ({
  collectionData,
  collection,
  page,
  limit,
  onNextPage,
  onPrevPage,
  fetchCollection,
  isSwappable,
}) => {
  const { showModal } = useContext(ModalContext);
  const { document, setDocument } = useContext(DocumentPageContext);

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

  const swapDocumentsHandler = () => {
    const parentCollectionData = getCollectionData(collectionData.parentCollection);

    showModal(
      <DocumentModal
        title={`Swap ${collectionData.name}`}
        FormElement={SwapDocumentsForm}
        formProps={{
          document,
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
            limit={limit}
            totalResults={collection.totalResults}
            isPrevDisabled={!notFirstPage}
            isNextDisabled={!notLastPage}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            useParams
          />
        )}

        {isSwappable && (
          <TableButtonRounded styleName="glass" variantName="white" onClick={swapDocumentsHandler}>
            <SwapIcon />
          </TableButtonRounded>
        )}

        <TableButtonRounded styleName="glass" variantName="white" onClick={createDocumentHandler}>
          <AddIcon />
        </TableButtonRounded>
      </div>
    </div>
  );
};

export default CollectionHeader;
