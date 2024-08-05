"use client";

import React, { Fragment, useContext, useEffect, useRef } from "react";
import classes from "./Modal.module.scss";
import { ModalContext } from "@/store/modal-context";
import { join } from "@/utils/helper";

const Modal = () => {
  const { visible, content, hideModal } = useContext(ModalContext);
  const modalRef = useRef(null);

  // Focus on first input if it exists and modal is visible
  useEffect(() => {
    const input = document.querySelector(`.${modalRef.current.classList[0]} input`);
    if (visible && input) input.focus();
  }, [visible]);

  return (
    <Fragment>
      <span className={join(classes.Backdrop, visible ? classes.visible : null)} onClick={hideModal} />
      <div className={join(classes.Modal, visible ? classes.visible : null)} ref={modalRef}>
        {content}
      </div>
    </Fragment>
  );
};

export default Modal;
