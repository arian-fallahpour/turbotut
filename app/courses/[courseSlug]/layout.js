import Section from "@/components/Elements/Section/Section";
import Page from "@/components/Elements/Page/Page";
import Sidebar from "@/components/pages/LecturePage/Sidebar/Sidebar";

import classes from "@/components/pages/LecturePage/LecturePage.module.scss";
import { fetchCourse } from "@/utils/dataFetch";
import { Suspense } from "react";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";

export default async function Layout({ children, params }) {
  const course = await fetchCourse(params.courseSlug);

  return (
    <Page background="flat">
      <Section
        limit={null}
        className={classes.LectureSection}
        id="lecture-section"
      >
        <Sidebar course={course} />
        <Suspense fallback={<LoaderBlock />}>{children}</Suspense>
      </Section>
    </Page>
  );
}
