"use client";

import React, { useEffect, useState } from "react";
import classes from "./TriangleGame.module.scss";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";

const TriangleGame = () => {
  const [selected, setSelected] = useState([]);
  const [lastUnselected, setLastUnselected] = useState(null);

  // Remove last selected item
  useEffect(() => {
    if (selected.length > 2) {
      setLastUnselected(selected[0]);
      setSelected((v) => [v[1], v[2]]);
    }
  }, [selected, lastUnselected]);

  const onClickHandler = (i) => {
    setSelected((arr) => (!arr.includes(i) ? [...arr, i] : arr));
  };

  return (
    <div className={classes.TriangleGame}>
      <div className={classes.TriangleGameHeader}>
        <h2 className="header header-section text-center color-red">
          The problem
        </h2>
        <p className="paragraph text-center">Try to pick all three</p>
      </div>
      <div className={classes.TriangleGameOptions}>
        <Button
          className={join(
            classes.TriangleGameButton,
            selected.includes(0) ? classes.selected : null,
            lastUnselected === 0 ? classes.unselected : null
          )}
          styleName="fill"
          variantName="orange"
          onClick={() => onClickHandler(0)}
        >
          <span>😴</span>
          <span>Sleep</span>
        </Button>
        <Button
          className={join(
            classes.TriangleGameButton,
            selected.includes(1) ? classes.selected : null,
            lastUnselected === 1 ? classes.unselected : null
          )}
          styleName="fill"
          variantName="blue"
          onClick={() => onClickHandler(1)}
        >
          <span>💯</span>
          <span>Good Grades</span>
        </Button>
        <Button
          className={join(
            classes.TriangleGameButton,
            selected.includes(2) ? classes.selected : null,
            lastUnselected === 2 ? classes.unselected : null
          )}
          styleName="fill"
          variantName="green"
          onClick={() => onClickHandler(2)}
        >
          <span>💬</span>
          <span>Social Life</span>
        </Button>
      </div>
    </div>
  );
};

export default TriangleGame;
