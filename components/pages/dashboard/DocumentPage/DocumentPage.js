import React from "react";
import classes from "./DocumentPage.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import { toSingular } from "@/utils/helper";

import DocumentPageHeader from "./DocumentPageHeader";

import { getCollectionData, getPopulates, getSelect } from "@/app/data/dashboard/collections";
import DocumentPageSections from "./DocumentPageSections";
import DocumentPageDetails from "./DocumentPageDetails";
import DocumentPageProvider from "./DocumentPageProvider";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import queryString from "query-string";

const getData = async function (collectionData, id) {
  const url = queryString.stringifyUrl({
    url: `${getDomain()}/api/${collectionData.name}/${id}`,
    query: {
      populate: getPopulates(collectionData.viewableFields),
      select: getSelect(collectionData, collectionData.viewableFields),
    },
  });

  const res = await fetchAuth(url, {
    cache: "no-store",
    next: { revalidate: 60 },
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: new Error(data.message) };
  }

  const documentName = toSingular(collectionData.name);
  return { document: JSON.parse(JSON.stringify(data?.data[documentName])) };
};

const DocumentPage = async ({ collectionName, id }) => {
  const collectionData = getCollectionData(collectionName);

  const { document, error } = await getData(collectionData, id);

  return (
    <DocumentPageProvider documentDefault={document}>
      <div className={classes.Main}>
        {/* Content */}
        {!error && (
          <>
            <DocumentPageHeader collectionData={collectionData} />
            <div className={classes.Content}>
              <DocumentPageSections document={document} collectionData={collectionData} />
              <DocumentPageDetails collectionData={collectionData} />
            </div>
          </>
        )}

        {/* Error */}
        {error && <ErrorBlock message={error.message} />}
      </div>
    </DocumentPageProvider>
  );
};

export default DocumentPage;
