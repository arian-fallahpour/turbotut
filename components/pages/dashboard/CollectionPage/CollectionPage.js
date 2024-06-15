import React from "react";
import classes from "./CollectionPage.module.scss";

import CollectionSection from "./CollectionSection/CollectionSection";

import collectionsData from "@/data/dashboard/collections";

const CollectionPage = ({ collectionName, searchParams }) => {
  const collectionData = collectionsData.find(
    (col) => col.name === collectionName
  );

  return (
    <main className={classes.Main}>
      {/* Table */}
      <CollectionSection
        collectionName={collectionName}
        collectionData={collectionData}
        searchParams={searchParams}
      />

      {/* Other sections */}
      {collectionData.collectionSections}
    </main>
  );
};

export default CollectionPage;
