import React from "react";
import classes from "./Price.module.scss";
import Button from "@/components/Elements/Button/Button";

import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";

const icons = { FlashOnRoundedIcon, SchoolRoundedIcon, KeyRoundedIcon };

const Price = ({ name, price, duration, benefits }) => {
  return (
    <div className={classes.Price}>
      <div className={classes.PriceHeader}>
        <div className={classes.PriceCost}>
          <h2 className="header header-card text-center uppercase">{name}</h2>
          <h3 className={"header color-orange text-center"}>${price}</h3>
          <p className="paragraph text-center">{duration}</p>
        </div>
        <Button styleName="shiny" variantName="orange" href="/checkout" isLink>
          Checkout
        </Button>
      </div>
      <div className={classes.PriceContent}>
        <ul className={classes.Benefits}>
          {benefits.map((benefit, i) => (
            <li key={i} className={classes.Benefit}>
              <span className={classes.BenefitIcon}>
                <benefit.IconTag fontSize="inherit" />
              </span>
              <p className="paragraph">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
