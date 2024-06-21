"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import classes from "./Collection.module.scss";
import { createGridTemplateColumns, join } from "@/utils/helper";

import Table, {
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/Elements/Table/Table";
import Actions from "../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Section from "@/components/Elements/Section/Section";
import CollectionHeader from "./CollectionHeader";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import { DocumentPageContext } from "@/store/document-page-context";
import queryString from "query-string";

const Collection = ({ className, collectionData, queryObject = {} }) => {
  const gridTemplateColumns = createGridTemplateColumns(collectionData);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { collections, setCollection } = useContext(DocumentPageContext);
  const collection = collections[collectionData.name];

  const prevPageHandler = () => {
    setPage((p) => (page > 1 ? p - 1 : p));
  };

  const nextPageHandler = () => {
    setPage((p) =>
      collection && page * queryObject.limit < collection.totalResults
        ? p + 1
        : p
    );
  };

  const fetchCollectionHandler = useCallback(async () => {
    setLoading(true);

    const url = queryString.stringifyUrl({
      url: `/api/${collectionData.name}`,
      query: { ...queryObject, page },
    });

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const resData = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(resData.message);
    } else {
      setCollection(
        {
          results: resData.data.results,
          totalResults: resData.data.totalResults,
          docs: resData.data[collectionData.name],
        },
        collectionData.name
      );
    }
  }, [collectionData.name, page, queryObject, setCollection]);

  useEffect(() => {
    fetchCollectionHandler();
  }, [fetchCollectionHandler]);

  return (
    <Section className={join(className, classes.CollectionSection)}>
      {/* Header */}
      <CollectionHeader
        collectionData={collectionData}
        limit={queryObject.limit}
        page={page}
        onNextPage={nextPageHandler}
        onPrevPage={prevPageHandler}
        fetchCollection={fetchCollectionHandler}
      />

      {loading && <LoaderBlock />}
      {error && <ErrorBlock message={error} />}
      {!error && collection && collection.docs.length === 0 && (
        <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
      )}

      {/* Table */}
      {!loading && collection && collection.docs.length > 0 && (
        <Table>
          <TableHeader style={{ gridTemplateColumns }}>
            {collectionData.tableFields.map((field) => (
              <TableCell key={field.label}>{field.label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableHeader>
          {collection.docs.map((doc) => (
            <TableRow key={doc._id} style={{ gridTemplateColumns }}>
              {collectionData.tableFields.map((field, i) => (
                <TableCell
                  key={field.label}
                  href={`/dashboard/${collectionData.name}/${doc._id}`}
                >
                  {doc[field.name]}
                </TableCell>
              ))}
              <TableCell end>
                <Actions name={collectionData.name} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </Section>
  );
};

export default Collection;
