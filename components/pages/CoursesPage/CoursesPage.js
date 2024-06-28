import React, { Suspense } from "react";
import classes from "./CoursesPage.module.scss";
import { join } from "@/utils/helper";

import Page from "@/components/Elements/Page/Page";
import Section from "@/components/Elements/Section/Section";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";

import Courses from "./Courses";

const CoursesPage = () => {
  return (
    <Page>
      <Section className={classes.CoursesSection} limit={null}>
        <h1 className={join("header", "header-title", "text-center")}>Courses</h1>
        <Suspense fallback={<LoaderBlock />}>
          <Courses />
        </Suspense>
      </Section>
    </Page>
  );
};

export default CoursesPage;
