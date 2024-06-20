"use client";

import React, { useEffect, useState } from "react";
import classes from "./Content.module.scss";
import { join } from "@/utils/helper";

import Section from "@/components/Elements/Section/Section";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";

const Content = ({ className, document }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(`/api/contents?lecture=${document._id}`);
      const resData = await res.json();

      setLoading(false);
      if (!res.ok) {
        setError(resData.message);
      } else {
        setData(resData.data.contents);
      }
    };

    fetchData();
  }, [document._id]);

  return (
    <Section className={join(className, classes.ContentSection)}>
      <div className={classes.ContentHeader}>
        <h2 className="header header-section">Content</h2>
      </div>
      {loading && <LoaderBlock />}
      {error && <ErrorBlock message={error} />}
      {!loading && !error && data && data.length === 0 && (
        <ErrorBlock type="info" message={`No content found`} />
      )}
      {!error &&
        data &&
        data.length > 0 &&
        data.map((content) => (
          <div key={content._id} className={classes.ContentGrid}>
            <ul className={classes.ContentDetails}>
              <li className={classes.ContentDetailsItem}>
                <h3 className="header header-text">id</h3>
                <p className="paragraph">{content._id}</p>
              </li>
              <li className={classes.ContentDetailsItem}>
                <h3 className="header header-text">url</h3>
                <p className="paragraph">{content.url}</p>
              </li>
            </ul>
            <div className={classes.ContentActions}></div>
          </div>
        ))}
    </Section>
  );
};

export default Content;
