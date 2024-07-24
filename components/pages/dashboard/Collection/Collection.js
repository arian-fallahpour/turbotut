"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import classes from "./Collection.module.scss";
import queryString from "query-string";
import { getGridColumns } from "@/app/data/dashboard/collections";

import Table, { TableHeader, TableRow, TableCell } from "@/components/Elements/Table/Table";
import TableScroll from "@/components/Elements/Table/TableScroll";
import Actions from "../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Section from "@/components/Elements/Section/Section";
import CollectionHeader from "./CollectionHeader";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";

const Collection = ({ collectionData, queryObject = {}, isSwappable }) => {
  const gridTemplateColumns = getGridColumns(collectionData);

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const fetchCollectionHandler = useCallback(async () => {
    setLoading(true);

    const url = queryString.stringifyUrl({
      url: `/api/${collectionData.name}`,
      query: {
        ...queryObject,
        select: collectionData.viewableFields.map((field) => field.name).join(","),
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
      {/* Header */}
      <CollectionHeader
        collectionData={collectionData}
        collection={collection}
        limit={queryObject.limit}
        page={page}
        fetchCollection={fetchCollectionHandler}
        isSwappable={isSwappable}
      />

      {/* Table */}
      {!loading && collection?.docs?.length > 0 && (
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
                <TableScroll key={field.label} href={`/dashboard/${collectionData.name}/${doc._id}`}>
                  {doc[field.name]}
                </TableScroll>
              ))}
              <TableCell end>
                <Actions document={doc} collectionName={collectionData.name} fetchCollection={fetchCollectionHandler} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* States */}
      {loading && <LoaderBlock />}
      {error && <ErrorBlock message={error} />}
      {!loading && !error && collection?.docs?.length === 0 && (
        <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
      )}
    </Section>
  );
};

export default Collection;
