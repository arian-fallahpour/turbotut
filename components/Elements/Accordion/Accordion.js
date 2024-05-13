"use client";

import React, { useRef, useState } from "react";
import classes from "./Accordion.module.scss";
import { join } from "@/utils/helper";

const Accordion = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const itemElements = items.map((item, i) => {
    const isSelected = selected === i;

    return (
      <li
        key={i}
        className={join(classes.Item, isSelected ? classes.selected : null)}
        onClick={() => setSelected((prev) => (prev === i ? null : i))}
      >
        <button className={classes.ItemButton} aria-expanded={isSelected}>
          <h3 className={join("header", "header-card", classes.ItemTitle)}>
            {item.title}
          </h3>
          <div className={classes.ItemContent}>
            <div className={classes.ItemOverflow}>
              <p className="paragraph">{item.description}</p>
            </div>
          </div>
        </button>
      </li>
    );
  });

  return (
    <ul
      className={classes.Accordion}
      aria-label="Accordion Control Button Group"
    >
      {itemElements}
    </ul>
  );
};

export default Accordion;
