"use client";

import React, { Fragment, useContext } from "react";
import classes from "./Modal.module.scss";
import { ModalContext } from "@/store/modal-context";
import { join } from "@/utils/helper";

const Modal = () => {
  const { visible, content, hideModal } = useContext(ModalContext);

  return (
    <Fragment>
      <span
        className={join(classes.Backdrop, visible ? classes.visible : null)}
        onClick={hideModal}
      />
      <div className={join(classes.Modal, visible ? classes.visible : null)}>
        {content}
      </div>
    </Fragment>
  );
};

export default Modal;
