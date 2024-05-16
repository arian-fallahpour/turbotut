"use client";

import React, { useState } from "react";
import classes from "./Accordion.module.scss";
import { join } from "@/utils/helper";
import Reveal from "../Reveal/Reveal";

const Accordion = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const itemElements = items.map((item, i) => {
    const isSelected = selected === i;

    return (
      <li key={i} className={join(classes.Item)}>
        <button
          className={classes.ItemButton}
          aria-expanded={isSelected}
          onClick={() => setSelected((prev) => (prev === i ? null : i))}
        >
          <h3 className={join("header", "header-card", classes.ItemTitle)}>
            {item.title}
          </h3>
        </button>
        <Reveal revealed={isSelected} className={classes.ItemReveal}>
          <div className={classes.ItemContent}>
            <p className="paragraph">{item.description}</p>
          </div>
        </Reveal>
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
