"use client";

import React, { useContext, useState, useEffect } from "react";
import classes from "./DocumentModal.module.scss";
import { ModalContext } from "@/store/modal-context";

const DocumentModal = ({ title, FormElement, formProps = {} }) => {
  const { hideModal, visible } = useContext(ModalContext);
  const [disabled, setDisabled] = useState(false);

  const cancelHandler = (e) => {
    e.preventDefault();
    hideModal();
  };

  useEffect(() => {
    if (visible) setDisabled(false);
  }, [visible]);

  return (
    <div className={classes.DocumentModal}>
      <h2 className="header header-section color-orange text-center">
        {title}
      </h2>

      {/* form */}
      <FormElement
        disabled={disabled}
        setDisabled={setDisabled}
        cancelHandler={cancelHandler}
        hideModal={hideModal}
        {...formProps}
      />
    </div>
  );
};

export default DocumentModal;
