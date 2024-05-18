import React from "react";
import classes from "./PaymentMethodsSection.module.scss";
import Button from "@/components/Elements/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const Card = ({
  id,
  brand,
  expiryMonth,
  expiryYear,
  last4,
  isDefault,
  onDetachCard,
  onSetDefault,
}) => {
  return (
    <li className={classes.Card}>
      <div className={classes.CardBrand}>
        <Image
          width={50}
          height={50}
          alt={`${brand} logo`}
          src={`/images/cards/${brand}.png`}
        />
      </div>
      <div className={classes.CardContent}>
        <div className={classes.CardLast4}>{`ends in ${last4}`}</div>
        <div className={classes.CardExpiry}>
          {("0" + expiryMonth).slice(-2)}/{expiryYear.toString().substring(2)}
        </div>
      </div>
      {isDefault && <span className={classes.CardDefault}>default</span>}
      {!isDefault && (
        <Button
          className={classes.CardSetDefault}
          onClick={() => onSetDefault(id)}
        >
          set default
        </Button>
      )}
      <Button
        className={classes.CardRemove}
        variantName="red"
        onClick={() => onDetachCard(id)}
      >
        <DeleteIcon fontSize="inherit" />
      </Button>
    </li>
  );
};

export default Card;
