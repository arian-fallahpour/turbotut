import React from "react";
import classes from "./DocumentPage.module.scss";
import { toSingular } from "@/utils/helper";

import Collection from "./Collection/Collection";

import collectionsData from "@/app/data/dashboard/collections";
import Content from "./Content/Content";

const DocumentPageSections = ({ document, collectionData }) => {
  const findCollectionData = (name) =>
    collectionsData.find((c) => c.name === name);

  return (
    <div className={classes.Sections}>
      {collectionData.documentSections.map((section) => {
        // Collection section
        if (section.type === "collection") {
          return (
            <Collection
              key={`section-${section.collection}`}
              className={classes.Section}
              document={document}
              collectionData={findCollectionData(section.collection)}
              queryObject={{
                limit: 5,
                [toSingular(collectionData.name)]: document._id,
              }}
            />
          );
        }

        // Content section
        if (section.type === "content") {
          return (
            <Content
              key="section-content"
              className={classes.Section}
              document={document}
            />
          );
        }
      })}
    </div>
  );
};

export default DocumentPageSections;
