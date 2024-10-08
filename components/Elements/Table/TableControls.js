"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Table.module.scss";

import Button from "../Button/Button";

import WestIcon from "../Icons/WestIcon";
import EastIcon from "../Icons/EastIcon";
import { TableButtonRounded } from "./Table";

const TableControls = ({
  page,
  setPage,
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
    if (page <= 1) return;

    if (useParams) {
      router.replace(`${pathname}?page=${JSON.parse(page) - 1}`);
    } else {
      setPage((p) => p - 1);
    }
  };

  const onNextPageHandler = () => {
    if (onNextPage) onNextPage();
    if (page >= totalResults) return;

    if (useParams) {
      router.replace(`${pathname}?page=${JSON.parse(page) + 1}`);
    } else {
      setPage((p) => p + 1);
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
      <div className={classes.ControlsPage}>{`Page ${page}/${Math.max(totalPages, 1)}`}</div>
      <TableButtonRounded styleName="glass" variantName="white" isDisabled={isNextDisabled} onClick={onNextPageHandler}>
        <EastIcon />
      </TableButtonRounded>
    </div>
  );
};

export default TableControls;
