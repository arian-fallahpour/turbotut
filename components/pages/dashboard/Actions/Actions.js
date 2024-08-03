"use client";

import React, { useContext } from "react";
import classes from "./Actions.module.scss";
import Button from "@/components/Elements/Button/Button";

import MoreIcon from "@/components/Elements/Icons/MoreIcon";

import { getCollectionData, getPopulates } from "@/app/data/dashboard/collections";
import DocumentModal from "../DocumentModal/DocumentModal";
import EditDocumentForm from "../DocumentModal/EditDocumentForm";
import { ModalContext } from "@/store/modal-context";
import { toSingular } from "@/utils/helper";
import DeleteDocumentForm from "../DocumentModal/DeleteDocumentForm";
import CreateDocumentForm from "../DocumentModal/CreateDocumentForm";
import { startProgress, stopProgress } from "next-nprogress-bar";
import { GlobalErrorContext } from "@/store/error-context";
import queryString from "query-string";
import EditIcon from "@/components/Elements/Icons/EditIcon";
import DeleteIcon from "@/components/Elements/Icons/DeleteIcon";
import AddChildIcon from "@/components/Elements/Icons/AddChildIcon";
import KickUserForm from "../DocumentModal/KickUserForm";
import KickIcon from "@/components/Elements/Icons/KickIcon";
import BanIcon from "@/components/Elements/Icons/BanIcon";
import BanUserForm from "../DocumentModal/BanUserForm";

const Actions = ({ document, collectionData, fetchCollection }) => {
  const { showModal } = useContext(ModalContext);
  const { setGlobalError } = useContext(GlobalErrorContext);

  const editDocumentHandler = async () => {
    startProgress();

    const url = queryString.stringifyUrl({
      url: `/api/${collectionData.name}/${document._id}`,
      query: {
        select: collectionData.editableFields.map((field) => field.name).join(","),
        populate: getPopulates(collectionData.editableFields),
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
          fetchCollection,
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

  const kickUserHandler = () => {
    showModal(
      <DocumentModal
        title={`Kick user?`}
        FormElement={KickUserForm}
        formProps={{
          user: document,
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
        }}
      />
    );
  };

  const onClickHandler = (action) => {
    if (action.type === "edit") {
      editDocumentHandler();
    } else if (action.type === "delete") {
      deleteDocumentHandler();
    } else if (action.type === "createChild") {
      createChildDocumentHandler(action.collection);
    } else if (action.type === "kick") {
      kickUserHandler();
    } else if (action.type === "ban") {
      banUserHandler();
    }
  };

  const filteredActions = ["delete", "edit", "createChild", "kick", "ban"];
  const icons = {
    delete: <DeleteIcon />,
    edit: <EditIcon />,
    createChild: <AddChildIcon />,
    kick: <KickIcon />,
    ban: <BanIcon />,
  };

  return (
    <div className={classes.Actions}>
      <Button className={classes.ActionsButton} styleName="glass" variantName="white">
        <MoreIcon />
      </Button>

      <div className={classes.ActionsList}>
        {collectionData.actions?.length > 0 &&
          collectionData.actions
            .filter((action) => filteredActions.includes(action.type))
            .map((action, i) => (
              <li className={classes.ActionsListItem} key={i}>
                <Button
                  styleName="glass"
                  variantName={action.type === "delete" ? "red" : "white"}
                  size="small"
                  onClick={() => onClickHandler(action)}
                >
                  {icons[action.type]}
                </Button>
              </li>
            ))}
      </div>
    </div>
  );
};

export default Actions;
