import React from "react";
import classes from "./DocumentPage.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import { toSingular } from "@/utils/helper";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Button from "@/components/Elements/Button/Button";
import Header from "./Header";
import Details from "./Details";
import Collection from "./Collection/Collection";

import collectionsData from "@/data/dashboard/collections";

const getData = async function (collectionName, id) {
  const res = await fetchAuth(`${getDomain()}/api/${collectionName}/${id}`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });

  const data = await res.json();

  let error;
  if (!res.ok) {
    error = new Error(data.message);
    return;
  }

  return JSON.parse(JSON.stringify(data.data[toSingular(collectionName)]));
};

const DocumentPage = async ({ collectionName, id }) => {
  const document = await getData(collectionName, id);
  const collectionData = collectionsData.find(
    (item) => item.name === collectionName
  );

  return (
    <main className={classes.Main}>
      <Button className={classes.Back} styleName="icon" isBackButton>
        <ArrowBackRoundedIcon fontSize="inherit" />
        Back
      </Button>
      <Header collectionData={collectionData} document={document} />
      <div className={classes.Content}>
        <div className={classes.Sections}>
          {collectionData.documentSections.map((section) => {
            if (section.type === "collection") {
              return (
                <Collection
                  key={`section-${section.collection}`}
                  className={classes.Section}
                  collectionData={collectionsData.find(
                    (c) => c.name === section.collection
                  )}
                  queryObject={{ [toSingular(collectionName)]: document._id }}
                />
              );
            }
          })}
        </div>
        <Details collectionData={collectionData} document={document} />
      </div>
    </main>
  );
};

export default DocumentPage;
