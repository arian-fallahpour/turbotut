"use client";

import React, { useEffect, useState } from "react";
import classes from "./ContentSection.module.scss";
import { join } from "@/utils/helper";

import Section from "@/components/Elements/Section/Section";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Formatted, { FormattedContent } from "@/components/Elements/Formatted/Formatted";
import { getNestedPath } from "@/app/data/dashboard/collections";

const ContentSection = ({ className, document, sectionData }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lectureId = getNestedPath(document, sectionData.name, sectionData.path);

    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(`/api/lectures/${lectureId}/content`);
      const resData = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(resData.message);
      } else {
        setData(resData.data.contents);
      }
    };

    if (lectureId) {
      fetchData();
    } else {
      setError("Lecture does not exist!");
    }
  }, [document, sectionData]);

  return (
    <Section className={join(className, classes.ContentSection)}>
      <div className={classes.ContentHeader}>
        <h2 className="header header-section">Preview</h2>
      </div>

      {!loading && !error && data?.length > 0 && (
        <FormattedContent className={classes.Content}>
          {data.map((obj, i) => (
            <Formatted key={i} {...obj} />
          ))}
        </FormattedContent>
      )}

      {loading && <LoaderBlock />}
      {error && <ErrorBlock message={error} />}
      {!loading && !error && data && data?.length === 0 && <ErrorBlock type="info" message={`No content found`} />}
    </Section>
  );
};

export default ContentSection;
