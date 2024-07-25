import React from "react";
import classes from "./DocumentPage.module.scss";
import { toSingular } from "@/utils/helper";

import Collection from "../Collection/Collection";

import { getCollectionData } from "@/app/data/dashboard/collections";
import ContentSection from "./ContentSection/ContentSection";

const DocumentPageSections = ({ document, collectionData }) => {
  return (
    <div className={classes.Sections}>
      {collectionData.documentSections.map((section) => {
        const childCollectionData = getCollectionData(section.collection);

        // Collection section
        if (section.type === "collection") {
          return (
            <Collection
              key={`section-${section.collection}`}
              className={classes.Section}
              document={document}
              collectionData={childCollectionData}
              queryObject={{
                limit: 5,
                [toSingular(collectionData.name)]: document._id,
              }}
              isSwappable={childCollectionData.isSwappable}
            />
          );
        }

        // Content section
        if (section.type === "content") {
          return <ContentSection key="section-content" className={classes.Section} document={document} />;
        }
      })}
    </div>
  );
};

export default DocumentPageSections;
