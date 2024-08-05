"use client";

import React, { useContext, useMemo } from "react";
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
import { getActionsMap } from "@/app/data/dashboard/collections";
import { startProgress, stopProgress } from "next-nprogress-bar";
import queryString from "query-string";
import KickUserForm from "../DocumentModal/KickUserForm";
import KickIcon from "@/components/Elements/Icons/KickIcon";
import BanIcon from "@/components/Elements/Icons/BanIcon";
import { GlobalErrorContext } from "@/store/error-context";
import BanUserForm from "../DocumentModal/BanUserForm";

const Header = ({ collectionData }) => {
  const { setGlobalError } = useContext(GlobalErrorContext);
  const { showModal } = useContext(ModalContext);
  const { document, setDocument } = useContext(DocumentPageContext);

  const actionsMap = useMemo(() => getActionsMap(collectionData.actions), [collectionData.actions]);

  const editDocumentHandler = () => {
    showModal(
      <DocumentModal
        title={`Edit ${toSingular(collectionData.name)}`}
        FormElement={EditDocumentForm}
        formProps={{
          collectionData,
          defaultValues: document,
          setDocument,
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
          collectionData,
          document,
          shouldLeavePage: true,
        }}
      />
    );
  };

  const kickUserHandler = () => {
    showModal(
      <DocumentModal
        title={`Kick user?`}
        FormElement={KickUserForm}
        formProps={{
          user: document,
          setUser: setDocument,
        }}
      />
    );
  };

  const banUserHandler = async () => {
    startProgress();

    const url = queryString.stringifyUrl({
      url: `/api/users/${document._id}`,
      query: {
        select: "isBanned",
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

    const { isBanned } = resData.data.user;

    const user = { ...document, isBanned };

    showModal(
      <DocumentModal
        title={`${user.isBanned ? "unban" : "ban"} user?`}
        FormElement={BanUserForm}
        formProps={{
          user,
          setUser: setDocument,
        }}
      />
    );
  };

  return (
    <div className={classes.Header}>
      <div className={classes.HeaderIcon}>{collectionData.icon}</div>
      <div className={classes.HeaderTitle}>
        <p className="paragraph">{toSingular(collectionData.name)}</p>
        <h1 className="header header-section">
          {document[collectionData.titleField] || toSingular(collectionData.name)}
        </h1>
        <p className="paragraph">{document._id}</p>
      </div>
      <div className={classes.HeaderActions}>
        {!!actionsMap.edit && (
          <Button className={classes.HeaderButton} styleName="glass" variantName="white" onClick={editDocumentHandler}>
            <EditIcon />
          </Button>
        )}
        {!!actionsMap.kick && (
          <Button className={classes.HeaderButton} styleName="glass" variantName="white" onClick={kickUserHandler}>
            <KickIcon />
          </Button>
        )}
        {!!actionsMap.ban && (
          <Button className={classes.HeaderButton} styleName="glass" variantName="white" onClick={banUserHandler}>
            <BanIcon />
          </Button>
        )}
        {!!actionsMap.delete && (
          <Button className={classes.HeaderButton} styleName="glass" variantName="red" onClick={deleteDocumentHandler}>
            <DeleteIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
