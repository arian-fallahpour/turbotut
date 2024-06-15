"use client";

import React from "react";
import { useRouter } from "next/navigation";
import classes from "./Table.module.scss";

import Button from "../Button/Button";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const TableControls = ({
  isStatic,
  page,
  totalResults,
  searchParams,
  collection,
  isNextDisabled,
  isPrevDisabled,
  onNextPage,
  onPrevPage,
}) => {
  const router = useRouter();

  const isFirstPage = isStatic && page <= 1;
  const isLastPage = isStatic && page * searchParams.limit >= totalResults;

  const prevPageHandler = () => {
    if (!isStatic) {
      onPrevPage();
    } else {
      if (!isFirstPage) {
        router.replace(`/dashboard/${collection}?page=${JSON.parse(page) - 1}`);
      }
    }
  };
  const nextPageHandler = () => {
    if (!isStatic) {
      onNextPage();
    } else {
      if (!isLastPage) {
        router.replace(`/dashboard/${collection}?page=${JSON.parse(page) + 1}`);
      }
    }
  };

  return (
    <div className={classes.Controls}>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isStatic ? isFirstPage : isPrevDisabled}
        onClick={prevPageHandler}
      >
        <ArrowBackRoundedIcon fontSize="inherit" />
      </Button>
      <div className={classes.ControlsPage}>{`Page ${page}`}</div>
      <Button
        className={classes.ControlsButton}
        styleName="glass"
        variantName="white"
        size="small"
        isDisabled={isStatic ? isLastPage : isNextDisabled}
        onClick={nextPageHandler}
      >
        <ArrowForwardRoundedIcon fontSize="inherit" />
      </Button>
    </div>
  );
};

export default TableControls;
