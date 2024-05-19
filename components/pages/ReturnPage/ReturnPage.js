import React from "react";
import classes from "./ReturnPage.module.scss";
import { fetchAuth, getDomain } from "@/utils/dataFetch";

import ErrorBlock from "@/components/Elements/ErrorBlock/ErrorBlock";
import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import Button from "@/components/Elements/Button/Button";

const getData = async (searchParams) => {
  const res = await fetchAuth(
    `${getDomain()}/api/stripe/session-status/${searchParams.session_id}`
  );
  const resData = await res.json();

  let error;
  if (!res.ok) {
    error = new Error(resData.message);
  }

  return { error, data: resData.data };
};

const ReturnPage = async ({ searchParams }) => {
  const { error, data } = await getData(searchParams);

  return (
    <Page>
      <Section className={classes.ReturnPage}>
        {error && <ErrorBlock message={error.message} />}
        {!error && (
          <div className={classes.Success}>
            <div className={classes.SuccessHeader}>
              <h1 className="header header-section color-green">success!</h1>
            </div>
            <div className={classes.SuccessContent}>
              <p className="paragraph">Session status: {data.sessionStatus}</p>
              <p className="paragraph">Payment status: {data.paymentStatus}</p>
              <p className="paragraph">Enjoy the courses!</p>
            </div>
            <div className={classes.SuccessActions}>
              <Button styleName="shiny" href="/courses" isLink>
                Courses
              </Button>
            </div>
          </div>
        )}
      </Section>
    </Page>
  );
};

export default ReturnPage;
