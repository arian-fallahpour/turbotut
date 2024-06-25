"use client";

import React, { useState } from "react";
import classes from "./ProblemSection.module.scss";
import MoonIcon from "@/components/Elements/Icons/MoonIcon";
import Button from "@/components/Elements/Button/Button";
import ChatIcon from "@/components/Elements/Icons/ChatIcon";
import SchoolIcon from "@/components/Elements/Icons/SchoolIcon";
import { join } from "@/utils/helper";

const Game = () => {
  const [activeButtons, setActiveButtons] = useState([]);

  const buttonClickHandler = (index) => {
    setActiveButtons((p) => {
      if (p[p.length - 1] !== index) {
        if (p.length > 1) p.pop();
        return [index, ...p];
      } else {
        return p;
      }
    });
  };

  return (
    <div className={join(classes.Game, classes.Content)}>
      <h2 className="header header-section text-center">Visualization</h2>
      <p className="paragraph text-center">Try to pick all three</p>
      <div className={classes.GameButtons}>
        <Button
          className={join(
            classes.GameButton,
            classes[`GameButton--1`],
            activeButtons.includes(0) ? classes.active : null
          )}
          onClick={() => buttonClickHandler(0)}
        >
          <MoonIcon />
          <span>sleep</span>
        </Button>
        <Button
          className={join(
            classes.GameButton,
            classes[`GameButton--2`],
            activeButtons.includes(1) ? classes.active : null
          )}
          onClick={() => buttonClickHandler(1)}
        >
          <ChatIcon />
          <span>social</span>
        </Button>
        <Button
          className={join(
            classes.GameButton,
            classes[`GameButton--3`],
            activeButtons.includes(2) ? classes.active : null
          )}
          onClick={() => buttonClickHandler(2)}
        >
          <SchoolIcon />
          <span>school</span>
        </Button>
      </div>
    </div>
  );
};

export default Game;
