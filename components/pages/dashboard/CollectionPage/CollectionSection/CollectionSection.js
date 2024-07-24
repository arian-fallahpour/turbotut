import React from "react";

import Collection from "../../Collection/Collection";

const CollectionSection = async ({ collectionData, searchParams }) => {
  searchParams.limit = 10;

  return <Collection collectionData={collectionData} queryObject={searchParams} />;
};

export default CollectionSection;
