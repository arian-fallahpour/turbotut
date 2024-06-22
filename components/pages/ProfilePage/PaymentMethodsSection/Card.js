import React from "react";
import classes from "./PaymentMethodsSection.module.scss";

import Button from "@/components/Elements/Button/Button";
import Image from "next/image";
import DeleteIcon from "@/components/Elements/Icons/DeleteIcon";

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
      {isDefault && (
        <Button
          className={classes.CardSetDefault}
          styleName="glass"
          size="small"
          disabled
        >
          default
        </Button>
      )}
      {!isDefault && (
        <Button
          className={classes.CardSetDefault}
          styleName="glass"
          onClick={() => onSetDefault(id)}
          size="small"
        >
          set default
        </Button>
      )}
      <Button
        className={classes.CardRemove}
        styleName="glass"
        variantName="red"
        onClick={() => onDetachCard(id)}
      >
        <DeleteIcon />
      </Button>
    </li>
  );
};

export default Card;
