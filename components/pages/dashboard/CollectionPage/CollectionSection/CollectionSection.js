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
import TableControls from "@/components/Elements/Table/TableControls";
import Actions from "../../Actions/Actions";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

const getData = async function (collection, queryObject) {
  const res = await fetchAuth(
    `${getDomain()}/api/${collection}?${createQueryString(queryObject)}`,
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

const CollectionSection = async ({
  collectionName,
  collectionData,
  searchParams,
}) => {
  searchParams.limit = 10;
  const page = searchParams.page || 1;

  const { data, error } = await getData(collectionName, searchParams);
  const documents = data[collectionName];

  const gridTemplateColumns = createGridTemplateColumns(collectionData);

  return (
    <Section className={classes.CollectionSection}>
      {/* HEADER */}
      <div className={classes.CollectionHeader}>
        <h1 className="header header-section">{collectionData.name}</h1>
        <TableControls
          page={page}
          collectionName={collectionName}
          totalResults={data.totalResults}
          searchParams={searchParams}
          isStatic
        />
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader style={{ gridTemplateColumns }}>
          {collectionData.tableFields.map((field) => (
            <TableCell key={field.label}>{field.label}</TableCell>
          ))}
          <TableCell></TableCell>
        </TableHeader>

        {!error &&
          documents.map((doc) => (
            <TableRow key={doc._id} style={{ gridTemplateColumns }}>
              {collectionData.tableFields.map((field, i) => (
                <TableCell
                  key={field.label}
                  href={`/dashboard/${collectionName}/${doc._id}`}
                >
                  {doc[field.field]}
                </TableCell>
              ))}
              <TableCell end>
                <Actions name={collectionData.name} />
              </TableCell>
            </TableRow>
          ))}
        {error && <ErrorBlock message={error.message} />}
      </Table>
    </Section>
  );
};

export default CollectionSection;
