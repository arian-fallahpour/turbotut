"use client";

import React from "react";
import classes from "./Table.module.scss";

import Button from "../Button/Button";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { usePathname, useRouter } from "next/navigation";

const TableControls = ({
  page,
  limit,
  totalResults,
  isNextDisabled,
  isPrevDisabled,
  onNextPage,
  onPrevPage,
  useParams,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalResults / limit);

  const onPrevPageHandler = () => {
    if (onPrevPage) onPrevPage();
    if (useParams && page > 1) {
      router.replace(`${pathname}?page=${JSON.parse(page) - 1}`);
    }
  };

  const onNextPageHandler = () => {
    if (onNextPage) onNextPage();
    if (useParams && page < totalResults) {
      router.replace(`${pathname}?page=${JSON.parse(page) + 1}`);
    }
  };

  return (
    <div className={classes.Controls}>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isPrevDisabled}
        onClick={onPrevPageHandler}
      >
        <ArrowBackRoundedIcon fontSize="inherit" />
      </Button>
      <div className={classes.ControlsPage}>{`Page ${page}/${Math.max(
        totalPages,
        1
      )}`}</div>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isNextDisabled}
        onClick={onNextPageHandler}
      >
        <ArrowForwardRoundedIcon fontSize="inherit" />
      </Button>
    </div>
  );
};

export default TableControls;
