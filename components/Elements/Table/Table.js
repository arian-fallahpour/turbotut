import React, { forwardRef } from "react";
import classes from "./Table.module.scss";

import { join } from "@/utils/helper";

import Link from "next/link";
import Button from "../Button/Button";

const Table = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.Table)} {...otherProps}>
      {children}
    </div>
  );
};

export const TableRow = ({ className, children, href, ...otherProps }) => {
  const Tag = href ? Link : "div";
  return (
    <Tag className={join(className, classes.TableRow, href ? classes.TableLink : null)} href={href} {...otherProps}>
      {children}
    </Tag>
  );
};

export const TableHeader = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.TableHeader)} {...otherProps}>
      {children}
    </div>
  );
};

export const TableCell = forwardRef(({ className, children, href, end = false, ...otherProps }, ref) => {
  const Tag = href ? Link : "div";

  return (
    <Tag
      className={join(className, classes.TableCell, href ? classes.TableLink : null, end ? classes.TableEnd : null)}
      href={href}
      {...otherProps}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
TableCell.displayName = "TableCell";

export const TableButtonRounded = ({ children, ...otherProps }) => {
  return (
    <Button className={classes.ButtonRounded} size="small" {...otherProps}>
      {children}
    </Button>
  );
};
export const TableButton = ({ children, ...otherProps }) => {
  return (
    <Button className={classes.Button} size="small" {...otherProps}>
      {children}
    </Button>
  );
};

export default Table;
