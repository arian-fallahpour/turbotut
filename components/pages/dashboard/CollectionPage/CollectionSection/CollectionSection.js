import React from "react";
import classes from "./CollectionSection.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import { createGridTemplateColumns, createQueryString } from "@/utils/helper";

import Section from "@/components/Elements/Section/Section";
import Table, {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Elements/Table/Table";
import Actions from "../../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import CollectionHeader from "./CollectionHeader";

const getData = async function (collectionData, queryObject) {
  queryObject.select = collectionData.tableFields
    .map((tableField) => `${tableField.name}`)
    .join(",");

  const res = await fetchAuth(
    `${getDomain()}/api/${collectionData.name}?${createQueryString(
      queryObject
    )}`,
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();

  let error;
  if (!res.ok) {
    error = new Error(data.message);
  }

  return {
    error,
    data: JSON.parse(JSON.stringify(data.data)),
  };
};

const CollectionSection = async ({ collectionData, searchParams }) => {
  searchParams.limit = 10;
  const { data, error } = await getData(collectionData, searchParams);
  const documents = data[collectionData.name];

  const gridTemplateColumns = createGridTemplateColumns(collectionData);

  return (
    <Section className={classes.CollectionSection}>
      {/* HEADER */}
      <CollectionHeader
        totalResults={data.totalResults}
        collectionData={collectionData}
        searchParams={searchParams}
      />

      {/* TABLE */}
      <Table>
        <TableHeader style={{ gridTemplateColumns }}>
          {collectionData.tableFields.map((field) => (
            <TableCell key={field.label}>{field.label}</TableCell>
          ))}
          <TableCell></TableCell>
        </TableHeader>

        {!error &&
          documents?.length > 0 &&
          documents.map((doc) => (
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

        {/* No documents */}
        {!error && documents?.length === 0 && (
          <ErrorBlock type="info" message={`No ${collectionData.name} found`} />
        )}

        {/* error */}
        {error && <ErrorBlock message={error.message} />}
      </Table>
    </Section>
  );
};

export default CollectionSection;
