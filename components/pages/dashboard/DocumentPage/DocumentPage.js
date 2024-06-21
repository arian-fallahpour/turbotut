import React from "react";
import classes from "./DocumentPage.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import { toSingular } from "@/utils/helper";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Button from "@/components/Elements/Button/Button";
import DocumentPageHeader from "./DocumentPageHeader";

import collectionsData from "@/app/data/dashboard/collections";
import DocumentPageSections from "./DocumentPageSections";
import DocumentPageDetails from "./DocumentPageDetails";
import DocumentPageProvider from "./DocumentPageProvider";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

const getData = async function (collectionData, id) {
  const res = await fetchAuth(
    `${getDomain()}/api/${collectionData.name}/${id}`,
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return { error: new Error(data.message) };
  }

  const documentName = toSingular(collectionData.name);
  return { document: JSON.parse(JSON.stringify(data?.data[documentName])) };
};

const DocumentPage = async ({ collectionName, id }) => {
  const collectionData = collectionsData.find((i) => i.name === collectionName);
  const { document, error } = await getData(collectionData, id);

  return (
    <DocumentPageProvider documentDefault={document}>
      <main className={classes.Main}>
        <Button className={classes.Back} styleName="icon" isBackButton>
          <ArrowBackRoundedIcon fontSize="inherit" />
          Back
        </Button>

        {/* Content */}
        {!error && (
          <>
            <DocumentPageHeader collectionData={collectionData} />

            <div className={classes.Content}>
              <DocumentPageSections
                document={document}
                collectionData={collectionData}
              />

              <DocumentPageDetails collectionData={collectionData} />
            </div>
          </>
        )}

        {/* Error */}
        {error && <ErrorBlock message={error.message} />}
      </main>
    </DocumentPageProvider>
  );
};

export default DocumentPage;
