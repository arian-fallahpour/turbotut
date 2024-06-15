"use client";

import React from "react";
import classes from "./Actions.module.scss";
import Button from "@/components/Elements/Button/Button";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import actions from "@/data/dashboard/actions";

const Actions = ({ name }) => {
  const data = actions[name];

  return (
    <div className={classes.Actions}>
      <Button
        className={classes.ActionsButton}
        styleName="glass"
        variantName="white"
      >
        <MoreVertRoundedIcon fontSize="inherit" />
      </Button>
      <div className={classes.ActionsList}>
        {data?.length > 0 &&
          data.map((action) => (
            <li className={classes.ActionsListItem} key={action.label}>
              <Button
                onClick={action.action}
                styleName="glass"
                variantName={action.label === "delete" ? "red" : "white"}
                size="small"
              >
                {action.label}
              </Button>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Actions;
