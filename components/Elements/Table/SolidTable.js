import React from "react";
import classes from "./Table.module.scss";
import { join } from "@/utils/helper";
import Table, { TableCell, TableHeader, TableRow } from "./Table";

// Prevents layout shift if table contents are loading
const SolidTable = ({ className, rowsCount = 0, children, ...otherProps }) => {
  const fakeRows = [];
  for (let i = 0; i < rowsCount; i++) {
    fakeRows.push(
      <TableRow key={i}>
        <TableCell>Cell {i + 1}</TableCell>
      </TableRow>
    );
  }

  return (
    <div className={join(className, classes.SolidTable)} {...otherProps}>
      <div className={classes.SolidTableSkeleton}>
        <Table>
          <TableHeader>
            <TableCell>Header</TableCell>
          </TableHeader>
          {fakeRows}
        </Table>
      </div>
      <div className={classes.SolidTableContent}>{children}</div>
    </div>
  );
};

export default SolidTable;
