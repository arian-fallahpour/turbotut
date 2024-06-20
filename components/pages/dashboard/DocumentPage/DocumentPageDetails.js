"use client";

import React, { useContext } from "react";
import classes from "./DocumentPage.module.scss";
import Button from "@/components/Elements/Button/Button";
import { DocumentPageContext } from "@/store/document-page-context";

const DocumentPageDetails = ({ collectionData }) => {
  const { document } = useContext(DocumentPageContext);

  return (
    <div className={classes.Details}>
      <h2 className={"header header-section text-center"}>Details</h2>
      <ul className={classes.DetailsList}>
        {collectionData.viewableFields?.length &&
          collectionData.viewableFields.map((field) => {
            let content;

            // BOOLEAN
            if (field.type === "boolean") {
              content = (
                <p className="paragraph">
                  {JSON.stringify(document[field.name])}
                </p>
              );
            }

            // DATE
            else if (field.type === "date") {
              const date = new Date(document[field.name]);
              content = <p className="paragraph">{date.toUTCString()}</p>;
            }

            // IMAGE
            else if (field.type === "image") {
              content = (
                <Button
                  className="paragraph"
                  styleName="text"
                  href={
                    document[field.name] || "/public/images/courses/default.png"
                  }
                  openNewTab
                  isLink
                >
                  View image
                </Button>
              );
            }

            // ID
            else if (field.type === "id") {
              content = (
                <Button
                  className="paragraph"
                  styleName="text"
                  href={`/dashboard/${field.collection}/${
                    document[field.name]
                  }`}
                  isLink
                >
                  {document[field.name]}
                </Button>
              );
            }

            // OTHER
            else {
              content = <p className="paragraph">{document[field.name]}</p>;
            }

            return (
              <li key={field.name} className={classes.DetailsListItem}>
                <h3 className="header header-text">{field.name}</h3>
                {content}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DocumentPageDetails;
