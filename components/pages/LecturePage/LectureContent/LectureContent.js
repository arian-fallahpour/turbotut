import React from "react";
import classes from "./LectureContent.module.scss";

import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Formatted, {
  FormattedContent,
} from "@/components/Elements/Formatted/Formatted";
import { fetchAuth, getDomain } from "@/utils/dataFetch";

// Should be revalidated every 60 seconds
const getData = async (lectureId) => {
  const res = await fetchAuth(
    `${getDomain()}/api/lectures/${lectureId}/content`,
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  const resData = await res.json();

  let error;
  if (!res.ok) {
    error = new Error(resData.message);
  }

  return { contents: resData.data?.contents, error };
};

const LectureContent = async ({ lecture }) => {
  const { contents, error } = await getData(lecture._id);

  return (
    <article className={classes.LectureContent} id="lecture-content">
      <header className={classes.LectureContentHeader}>
        <h1 className="header header-title text-center">{lecture.name}</h1>
      </header>
      <FormattedContent>
        {!error &&
          contents?.length &&
          contents.map((data, i) => <Formatted key={i} {...data} />)}
        {error && (
          <ErrorBlock
            className={classes.LectureContentError}
            message={error.message}
            type="info"
          />
        )}
      </FormattedContent>
    </article>
  );
};

export default LectureContent;
