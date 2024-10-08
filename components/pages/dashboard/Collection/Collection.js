"use client";

import React, { useState, useEffect, useCallback } from "react";
import classes from "./Collection.module.scss";
import queryString from "query-string";
import { getGridColumns, getPopulates } from "@/app/data/dashboard/collections";

import Table, { TableHeader, TableRow, TableCell } from "@/components/Elements/Table/Table";
import TableScroll from "@/components/Elements/Table/TableScroll";
import Actions from "../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Section from "@/components/Elements/Section/Section";
import CollectionHeader from "./CollectionHeader";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import SolidTable from "@/components/Elements/Table/SolidTable";

const Collection = ({ collectionData, queryObject = {}, isSwappable, useParams }) => {
  const gridTemplateColumns = getGridColumns(collectionData);

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCollectionHandler = useCallback(async () => {
    setLoading(true);

    const url = queryString.stringifyUrl({
      url: `/api/${collectionData.name}`,
      query: {
        ...queryObject,
        select: collectionData.tableFields.map((field) => field.name).join(","),
        populate: getPopulates(collectionData.tableFields),
        page,
      },
    });

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const resData = await res.json();

    setLoading(false);

    // Handle errors
    if (!res.ok) {
      return setError(resData.message);
    }

    // Handle success
    setCollection({
      results: resData.data.results,
      totalResults: resData.data.totalResults,
      docs: resData.data[collectionData.name],
    });
  }, [collectionData, page, queryObject]);

  // Fetches data once loaded
  useEffect(() => {
    fetchCollectionHandler();
  }, [fetchCollectionHandler]);

  return (
    <Section className={classes.CollectionSection} limit={null}>
      <CollectionHeader
        collectionData={collectionData}
        collection={collection}
        limit={queryObject.limit}
        page={page}
        setPage={setPage}
        fetchCollection={fetchCollectionHandler}
        isSwappable={isSwappable}
        useParams={useParams}
      />
      <div className={classes.CollectionContent}>
        <SolidTable rowsCount={queryObject.limit}>
          {collection?.docs?.length > 0 && (
            <Table>
              <TableHeader style={{ gridTemplateColumns }}>
                {collectionData.tableFields.map((field) => (
                  <TableCell key={field.label}>{field.label}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableHeader>
              {collection.docs.map((doc) => (
                <TableRow key={doc._id} style={{ gridTemplateColumns }}>
                  {collectionData.tableFields.map((field) => (
                    <TableCell key={field.label} href={`/dashboard/${collectionData.name}/${doc._id}`}>
                      <TableScroll>{getCellValue(field, doc)}</TableScroll>
                    </TableCell>
                  ))}
                  <TableCell end>
                    {collectionData.actions.length > 0 && (
                      <Actions
                        document={doc}
                        collectionData={collectionData}
                        fetchCollection={fetchCollectionHandler}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}

          {loading && !collection && <LoaderBlock />}
          {!loading && error && !collection && <ErrorBlock message={error} />}
          {!loading && !error && collection?.docs?.length === 0 && (
            <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
          )}
        </SolidTable>
      </div>
    </Section>
  );
};

function getCellValue(field, doc) {
  if (field.type === "string") {
    return (doc[field.name] && doc[field.name][field.path]) || doc[field.name];
  } else if (field.type === "date") {
    const createdAt = new Date(doc[field.name]);
    const date = createdAt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = createdAt.toLocaleTimeString(undefined, {
      second: undefined,
    });

    return `${date} ${time}`;
  } else {
    return JSON.stringify(doc[field.name]);
  }
}

export default Collection;
