import React from "react";
import classes from "./Table.module.scss";

import Button from "../Button/Button";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const TableControls = ({
  page,
  limit,
  totalResults,
  isNextDisabled,
  isPrevDisabled,
  onNextPage,
  onPrevPage,
}) => {
  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className={classes.Controls}>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isPrevDisabled}
        onClick={onPrevPage}
      >
        <ArrowBackRoundedIcon fontSize="inherit" />
      </Button>
      <div className={classes.ControlsPage}>{`Page ${page}/${Math.min(
        totalPages,
        1
      )}`}</div>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isNextDisabled}
        onClick={onNextPage}
      >
        <ArrowForwardRoundedIcon fontSize="inherit" />
      </Button>
    </div>
  );
};

export default TableControls;
