"use client";

import React, { useContext } from "react";
import classes from "./Collection.module.scss";

import TableControls from "@/components/Elements/Table/TableControls";

import { toSingular } from "@/utils/helper";
import { TableButtonRounded } from "@/components/Elements/Table/Table";
import { ModalContext } from "@/store/modal-context";
import DocumentModal from "../DocumentModal/DocumentModal";
import CreateDocumentForm from "../DocumentModal/CreateDocumentForm";
import { DocumentPageContext } from "@/store/document-page-context";
import AddIcon from "@/components/Elements/Icons/AddIcon";

const CollectionHeader = ({
  collectionData,
  page,
  limit,
  onNextPage,
  onPrevPage,
  fetchCollection,
}) => {
  const { showModal } = useContext(ModalContext);
  const { document, collections } = useContext(DocumentPageContext);
  const collection = collections[collectionData.name];

  const handleCreateDocument = () => {
    showModal(
      <DocumentModal
        title={`Create ${toSingular(collectionData.name)}`}
        FormElement={CreateDocumentForm}
        formProps={{ document, collectionData, fetchCollection }}
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

        <TableButtonRounded styleName="glass" onClick={handleCreateDocument}>
          <AddIcon />
        </TableButtonRounded>
      </div>
    </div>
  );
};

export default CollectionHeader;
