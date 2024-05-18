import React from "react";
import classes from "./PaymentMethodsSection.module.scss";
import Button from "@/components/Elements/Button/Button";

const Modal = ({ onCancel, onConfirm, cards }) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalHeader}>
        <h2 className="header header-card color-red">Detach Payment Method?</h2>
      </div>
      <div className={classes.ModalContent}>
        <p className="paragraph">
          Are you sure you want to detach this payment method?
        </p>
        {cards.length === 1 && (
          <p className="paragraph">
            Removing this card will automatically cancel your subscription and
            not renew it
          </p>
        )}
      </div>
      <div className={classes.ModalActions}>
        <Button styleName="shiny" variantName="red" onClick={onCancel}>
          cancel
        </Button>
        <Button styleName="shiny" variantName="green" onClick={onConfirm}>
          detach card
        </Button>
      </div>
    </div>
  );
};

export default Modal;
