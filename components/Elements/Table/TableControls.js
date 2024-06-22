"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Table.module.scss";

import Button from "../Button/Button";

import WestIcon from "../Icons/WestIcon";
import EastIcon from "../Icons/EastIcon";

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
        <WestIcon />
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
        <EastIcon />
      </Button>
    </div>
  );
};

export default TableControls;
