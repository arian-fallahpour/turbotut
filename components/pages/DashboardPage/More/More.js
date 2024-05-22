"use client";

import React, { useState } from "react";
import classes from "./More.module.scss";
import Button from "@/components/Elements/Button/Button";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { join } from "@/utils/helper";

const More = ({ actions = [] }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={classes.More}
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Button
        className={classes.Expand}
        styleName="glass"
        variantName="white"
        size="small"
      >
        <MoreVertRoundedIcon fontSize="inherit" />
      </Button>
      <div className={join(classes.Actions, visible ? classes.visible : null)}>
        <span className={classes.Hover} />
        {actions.map((action) => (
          <Button
            key={action.key}
            className={classes.Action}
            styleName="glass"
            variantName={action.color || "white"}
            size="small"
            onClick={action.onClick}
          >
            {action.key}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default More;

export const MoreMenu = () => {};
