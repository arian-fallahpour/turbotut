"use client";

import React, { useState, useEffect } from "react";
import classes from "./Collection.module.scss";
import {
  createGridTemplateColumns,
  createQueryString,
  join,
} from "@/utils/helper";

import Table, {
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/Elements/Table/Table";
import TableControls from "@/components/Elements/Table/TableControls";
import Actions from "../../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Section from "@/components/Elements/Section/Section";

const Collection = ({ className, collectionData, queryObject = {} }) => {
  const limit = 5;
  const gridTemplateColumns = createGridTemplateColumns(collectionData);

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const isFirstPage = (page) => page <= 1;
  const isLastPage = (page) => !(data && page * limit < data.totalResults);

  const nextPageHandler = () => {
    setPage((p) => (isLastPage(p) ? p : p + 1));
  };

  const prevPageHandler = () => {
    setPage((p) => (isFirstPage(p) ? p : p - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/${collectionData.name}?limit=${limit}&page=${page}`;

      const queryStr = createQueryString(queryObject);
      if (queryStr) url += `&${queryStr}`;
      console.log(url);

      const res = await fetch(url, {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      const resData = await res.json();

      if (!res.ok) {
        console.log(resData);
        setError(resData.message);
        return;
      }

      setData(resData.data);
    };

    fetchData();
  }, [collectionData.name, queryObject, page]);

  if (data) console.log(data[collectionData.name]);

  return (
    <Section className={join(className, classes.CollectionSection)}>
      <div className={classes.CollectionHeader}>
        <h3 className="header header-section">{collectionData.name}</h3>
        <TableControls
          page={page}
          isNextDisabled={isLastPage(page)}
          isPrevDisabled={isFirstPage(page)}
          onNextPage={nextPageHandler}
          onPrevPage={prevPageHandler}
        />
      </div>

      {/* Table */}
      {data && data[collectionData.name]?.length > 0 && (
        <Table>
          <TableHeader style={{ gridTemplateColumns }}>
            {collectionData.tableFields.map((field) => (
              <TableCell key={field.label}>{field.label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableHeader>

          {data[collectionData.name].map((doc) => (
            <TableRow key={doc._id} style={{ gridTemplateColumns }}>
              {collectionData.tableFields.map((field, i) => (
                <TableCell
                  key={field.label}
                  href={`/dashboard/${collectionData.name}/${doc._id}`}
                >
                  {doc[field.field]}
                </TableCell>
              ))}
              <TableCell end>
                <Actions name={collectionData.name} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* No documents found */}
      {!error && data && data[collectionData.name].length === 0 && (
        <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
      )}

      {/* error */}
      {error && <ErrorBlock message={error} />}
    </Section>
  );
};

export default Collection;
