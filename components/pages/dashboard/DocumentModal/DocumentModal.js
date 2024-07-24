"use client";

import React, { useContext, useState, useEffect } from "react";
import classes from "./DocumentModal.module.scss";
import { ModalContext } from "@/store/modal-context";

const DocumentModal = ({ title, FormElement, formProps = {} }) => {
  const { hideModal, visible } = useContext(ModalContext);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (visible) setIsDisabled(false);
  }, [visible]);

  return (
    <div className={classes.DocumentModal}>
      <h2 className="header header-section color-orange text-center">{title}</h2>

      {/* form */}
      <FormElement isDisabled={isDisabled} setIsDisabled={setIsDisabled} hideModal={hideModal} {...formProps} />
    </div>
  );
};

export default DocumentModal;
