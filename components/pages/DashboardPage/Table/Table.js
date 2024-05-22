import React from "react";
import classes from "./Table.module.scss";

const Table = ({ columns: [] }) => {
  return (
    <div className={classes.Table}>
      <div className={classes.TabelContent}>
        <div className={classes.TableHeader}></div>
        <div className={classes.TableRows}>
          {items.map((item) => (
            <div key={item._id} className={classes.Row}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
