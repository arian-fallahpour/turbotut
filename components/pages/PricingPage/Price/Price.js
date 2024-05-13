import React from "react";
import classes from "./Price.module.scss";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";

const Price = ({ name, cost, color, duration, benefits, cta, link }) => {
  return (
    <div className={join(classes.Price, classes[`Price--${color}`])}>
      <div className={classes.PriceHeader}>
        <h2 className="header header-card text-center uppercase">{name}</h2>
        <h3 className={join("header", `color-${color}`, classes.PriceCost)}>
          {cost}
        </h3>
        <p className="paragraph">{duration}</p>
      </div>
      <ul className={join("ul", classes.PriceList)}>
        {benefits.map((benefit, i) => (
          <li key={i} className={join("li", classes.PriceListItem)}>
            <span className="text-emoji">{benefit.emoji}</span>
            <span>{benefit.description}</span>
          </li>
        ))}
      </ul>
      <div className={classes.PriceButton}>
        <Button styleName="fill" variantName={color} href={link} isLink>
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default Price;
