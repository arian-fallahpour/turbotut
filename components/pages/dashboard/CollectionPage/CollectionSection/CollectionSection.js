import React from "react";
import classes from "./CollectionSection.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import { createGridTemplateColumns } from "@/utils/helper";

import Section from "@/components/Elements/Section/Section";
import Table, { TableCell, TableHeader, TableRow } from "@/components/Elements/Table/Table";
import Actions from "../../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import CollectionHeader from "./CollectionHeader";
import queryString from "query-string";

const getData = async function (collectionData, queryObject) {
  queryObject.select = collectionData.tableFields.map((tableField) => `${tableField.name}`).join(",");

  // Create url
  const url = queryString.stringifyUrl({
    url: `${getDomain()}/api/${collectionData.name}`,
    query: queryObject,
  });

  // Make request
  const res = await fetchAuth(url, {
    cache: "no-store",
  });

  const resData = await res.json();

  if (!res.ok) {
    return { error: new Error(resData.message) };
  } else {
    return { data: JSON.parse(JSON.stringify(resData.data)) };
  }
};

const CollectionSection = async ({ collectionData, searchParams }) => {
  searchParams.limit = 10;

  const { data, error } = await getData(collectionData, searchParams);

  const gridTemplateColumns = createGridTemplateColumns(collectionData);

  return (
    <Section className={classes.CollectionSection}>
      {/* HEADER */}
      <CollectionHeader
        totalResults={error ? 0 : data.totalResults}
        collectionData={collectionData}
        searchParams={searchParams}
      />

      {error && <ErrorBlock message={error.message} />}
      {!error && data[collectionData.name] && data[collectionData.name].length === 0 && (
        <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
      )}

      {/* TABLE */}
      {!error && data[collectionData.name] && data[collectionData.name].length > 0 && (
        <Table>
          <TableHeader style={{ gridTemplateColumns }}>
            {collectionData.tableFields.map((field) => (
              <TableCell key={field.label}>{field.label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableHeader>

          {data[collectionData.name] &&
            data[collectionData.name].map((doc) => (
              <TableRow key={doc._id} style={{ gridTemplateColumns }}>
                {collectionData.tableFields.map((field, i) => (
                  <TableCell key={field.label} href={`/dashboard/${collectionData.name}/${doc._id}`}>
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

export default CollectionSection;

// NOTE: Use Collection instead of doing it all over again here
