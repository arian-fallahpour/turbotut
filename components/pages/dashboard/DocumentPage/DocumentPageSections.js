import React, { useContext } from "react";
import classes from "./DocumentPage.module.scss";
import { toSingular } from "@/utils/helper";

import Collection from "../Collection/Collection";

import { getCollectionData } from "@/app/data/dashboard/collections";
import ContentSection from "./ContentSection/ContentSection";

const DocumentPageSections = ({ document, collectionData }) => {
  return (
    <div className={classes.Sections}>
      {collectionData.documentSections.map((sectionData) => {
        const childCollectionData = getCollectionData(sectionData.collection);

        // Collection section
        if (sectionData.type === "collection") {
          return (
            <Collection
              key={`section-${sectionData.collection}`}
              className={classes.Section}
              document={document}
              collectionData={childCollectionData}
              queryObject={{ limit: 5, [toSingular(collectionData.name)]: document._id, sort: sectionData.sort }}
              isSwappable={childCollectionData.isSwappable}
            />
          );
        }

        // Content preview section
        if (sectionData.type === "content") {
          return (
            <ContentSection
              key="section-content"
              className={classes.Section}
              document={document}
              sectionData={sectionData}
            />
          );
        }
      })}
    </div>
  );
};

export default DocumentPageSections;
