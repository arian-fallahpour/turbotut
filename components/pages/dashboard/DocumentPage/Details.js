import React from "react";
import classes from "./DocumentPage.module.scss";

const Details = ({ collectionData, document }) => {
  return (
    <div className={classes.Details}>
      <h2 className={"header header-section text-center"}>Details</h2>
      <ul className={classes.DetailsList}>
        {collectionData.viewableFields?.length &&
          collectionData.viewableFields.map((field) => {
            let text;
            if (field.type === "boolean") {
              text = JSON.stringify(document[field.field]);
            } else if (field.type === "date") {
              text = new Date(document[field.field]).toLocaleDateString();
            } else {
              text = document[field.field];
            }

            return (
              <li key={field.field} className={classes.DetailsListItem}>
                <h3 className="header header-text">{field.field}</h3>
                <p className="paragraph">{text}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Details;
