import "katex/dist/katex.min.css";

import React from "react";
import classes from "./LectureContent.module.scss";

import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Formatted, {
  FormattedContent,
} from "@/components/Elements/Formatted/Formatted";
import { fetchAuth, getDomain } from "@/utils/dataFetch";

// Added to prevent error
import Lecture from "@/models/lectureModel";
import Content from "@/models/contentModel";
import Latex from "react-latex-next";

// Should be revalidated every 1-6 hours or so
const getData = async (lectureId) => {
  const res = await fetchAuth(
    `${getDomain()}/api/lectures/${lectureId}/content`,
    { next: { revalidate: 60 * 60 * 4 } }
  );

  const data = await res.json();

  let error;
  if (!res.ok) {
    error = new Error(data.message);
  }

  return { contents: data.data?.contents, error };
};

const LectureContent = async ({ lecture }) => {
  const { contents, error } = await getData(lecture._id);

  return (
    <article className={classes.LectureContent}>
      <header className={classes.LectureContentHeader}>
        <h1 className="header header-title text-center">{lecture.name}</h1>
      </header>
      <FormattedContent>
        {error && (
          <ErrorBlock
            className={classes.LectureContentError}
            message={error.message}
            type="info"
          />
        )}
        {!error && (
          <div className={classes.Formatted}>
            {contents?.length &&
              contents.map((data, i) => <Formatted key={i} {...data} />)}
          </div>
        )}
      </FormattedContent>
    </article>
  );
};

export default LectureContent;
