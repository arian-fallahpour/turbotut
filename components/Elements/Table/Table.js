import { join } from "@/utils/helper";
import React from "react";
import classes from "./Table.module.scss";

const Table = ({ className, children, ...otherProps }) => {
  return <div className={join(className, classes.Table)}>{children}</div>;
};

export const TableRow = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.TableRow)} {...otherProps}>
      {children}
    </div>
  );
};

export const TableHeader = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.TableHeader)} {...otherProps}>
      {children}
    </div>
  );
};

export const TableCell = ({ className, children, ...otherProps }) => {
  return (
    <div className={join(className, classes.TableCell)} {...otherProps}>
      {children}
    </div>
  );
};

export default Table;
