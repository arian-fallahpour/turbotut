"use client";

import React, { useContext } from "react";
import classes from "./CollectionSection.module.scss";

import TableControls from "@/components/Elements/Table/TableControls";
import { useRouter } from "next/navigation";
import { startProgress } from "next-nprogress-bar";
import { TableButtonRounded } from "@/components/Elements/Table/Table";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { toSingular } from "@/utils/helper";
import { ModalContext } from "@/store/modal-context";
import DocumentModal from "../../DocumentModal/DocumentModal";
import CreateDocumentForm from "../../DocumentModal/CreateDocumentForm";

const CollectionHeader = ({ totalResults, collectionData, searchParams }) => {
  const { showModal } = useContext(ModalContext);

  const page = JSON.parse(searchParams.page || 1);
  const router = useRouter();

  const notFirstPage = page > 1;
  const notLastPage = page * searchParams.limit < totalResults;

  const handlePrevPage = () => {
    if (notFirstPage) {
      startProgress();
      router.replace(`/dashboard/${collectionData.name}?page=${page - 1}`);
    }
  };

  const handleNextPage = () => {
    if (notLastPage) {
      startProgress();
      router.replace(`/dashboard/${collectionData.name}?page=${page + 1}`);
    }
  };

  const handleCreateDocument = () => {
    showModal(
      <DocumentModal
        title={`Create ${toSingular(collectionData.name)}`}
        FormElement={CreateDocumentForm}
        formProps={{ collectionData, fetchCollection: () => {} }}
      />
    );
  };

  return (
    <div className={classes.CollectionHeader}>
      <h1 className="header header-section">{collectionData.name}</h1>
      <div className={classes.CollectionActions}>
        <TableControls
          page={page}
          limit={searchParams.limit}
          totalResults={totalResults}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          isPrevDisabled={!notFirstPage}
          isNextDisabled={!notLastPage}
        />

        <TableButtonRounded styleName="glass" onClick={handleCreateDocument}>
          <AddRoundedIcon fontSize="inherit" />
        </TableButtonRounded>
      </div>
    </div>
  );
};

export default CollectionHeader;
