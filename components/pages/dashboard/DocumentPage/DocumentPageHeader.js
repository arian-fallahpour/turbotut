"use client";

import React, { useContext } from "react";
import classes from "./DocumentPage.module.scss";
import { ModalContext } from "@/store/modal-context";
import { DocumentPageContext } from "@/store/document-page-context";
import { toSingular } from "@/utils/helper";

import DocumentModal from "../DocumentModal/DocumentModal";
import EditDocumentForm from "../DocumentModal/EditDocumentForm";
import DeleteDocumentForm from "../DocumentModal/DeleteDocumentForm";
import Button from "@/components/Elements/Button/Button";
import EditIcon from "@/components/Elements/Icons/EditIcon";
import DeleteIcon from "@/components/Elements/Icons/DeleteIcon";

const Header = ({ collectionData }) => {
  const { showModal } = useContext(ModalContext);
  const { document, setDocument } = useContext(DocumentPageContext);

  const editDocumentHandler = () => {
    showModal(
      <DocumentModal
        title={`Edit ${toSingular(collectionData.name)}`}
        FormElement={EditDocumentForm}
        formProps={{
          collectionData,
          document,
          setDocument,
        }}
      />
    );
  };

  const deleteDocumentHandler = (id) => {
    showModal(
      <DocumentModal
        title={`Delete ${toSingular(collectionData.name)}`}
        FormElement={DeleteDocumentForm}
        formProps={{
          collectionData,
          document,
        }}
      />
    );
  };

  return (
    <div className={classes.Header}>
      <div className={classes.HeaderIcon}>{collectionData.icon}</div>
      <div className={classes.HeaderTitle}>
        <p className="paragraph">{toSingular(collectionData.name)}</p>
        <h1 className="header header-section">{document.name}</h1>
        <p className="paragraph">{document._id}</p>
      </div>
      <div className={classes.HeaderActions}>
        <Button
          className={classes.HeaderButton}
          styleName="glass"
          variantName="white"
          onClick={editDocumentHandler}
        >
          <EditIcon />
        </Button>
        <Button
          className={classes.HeaderButton}
          styleName="glass"
          variantName="red"
          onClick={deleteDocumentHandler}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
