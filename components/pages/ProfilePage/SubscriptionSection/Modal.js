import React from "react";
import classes from "./SubscriptionSection.module.scss";
import Button from "@/components/Elements/Button/Button";

const Modal = ({ onCancel, onConfirm }) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalHeader}>
        <h2 className="header header-card color-red">Cancel subscription?</h2>
      </div>
      <div className={classes.ModalContent}>
        <p className="paragraph">
          Are you sure you want to cancel your subscription?
        </p>
        <p className="paragraph">
          You still have access to premium features until your next billing
          cycle.
        </p>
      </div>
      <div className={classes.ModalActions}>
        <Button variantName="red" onClick={onCancel}>
          back
        </Button>
        <Button variantName="green" onClick={onConfirm}>
          cancel subscription
        </Button>
      </div>
    </div>
  );
};
export default Modal;
