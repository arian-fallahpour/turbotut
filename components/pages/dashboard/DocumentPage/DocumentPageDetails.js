"use client";

import React, { useContext } from "react";
import classes from "./DocumentPage.module.scss";
import Button from "@/components/Elements/Button/Button";
import { DocumentPageContext } from "@/store/document-page-context";
import { getNestedPath } from "@/app/data/dashboard/collections";

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
              if (typeof document[field.name] === undefined || document[field.name] === null) {
                content = <p className="paragraph">Not Specified</p>;
              } else {
                content = <p className="paragraph">{JSON.stringify(document[field.name])}</p>;
              }
            }

            // DATE
            else if (field.type === "date") {
              if (!document[field.name]) {
                content = <p className="paragraph">Not Specified</p>;
              } else {
                const date = new Date(document[field.name]);
                content = <p className="paragraph">{date.toUTCString()}</p>;
              }
            }

            // IMAGE
            else if (field.type === "image") {
              content = (
                <Button
                  className="paragraph"
                  styleName="text"
                  href={document[field.name] || "/public/images/courses/default.png"}
                  openNewTab
                  isLink
                >
                  View image
                </Button>
              );
            }

            // ID
            else if (field.type === "id") {
              if (!document[field.name]) {
                content = <p className="paragraph">Not Found</p>;
              } else {
                content = (
                  <Button
                    className="paragraph"
                    styleName="text"
                    href={`/dashboard/${field.collection}/${getNestedPath(document, field.name, "_id")}`}
                    isLink
                  >
                    {getNestedPath(document, field.name, field.path)}
                  </Button>
                );
              }
            }

            // OTHER
            else {
              content = <p className="paragraph">{document[field.name] || "Not Specified"}</p>;
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
