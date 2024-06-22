"use client";

import React from "react";
import classes from "./Actions.module.scss";
import Button from "@/components/Elements/Button/Button";

import MoreIcon from "@/components/Elements/Icons/MoreIcon";

import actions from "@/app/data/dashboard/actions";

const Actions = ({ name }) => {
  const data = actions[name];

  return (
    <div className={classes.Actions}>
      <Button
        className={classes.ActionsButton}
        styleName="glass"
        variantName="white"
      >
        <MoreIcon />
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
