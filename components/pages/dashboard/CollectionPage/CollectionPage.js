import React from "react";
import classes from "./CollectionPage.module.scss";

import CollectionSection from "./CollectionSection/CollectionSection";

import { getCollectionData } from "@/app/data/dashboard/collections";

const CollectionPage = ({ collectionName, searchParams }) => {
  const collectionData = getCollectionData(collectionName);

  return (
    <div className={classes.CollectionPage}>
      {/* Table */}
      <CollectionSection collectionData={collectionData} searchParams={searchParams} useParams />

      {/* Other sections */}
      {collectionData.collectionSections}
    </div>
  );
};

export default CollectionPage;
