import Section from "@/components/Elements/Section/Section";
import Page from "@/components/Elements/Page/Page";
import Sidebar from "@/components/pages/LecturePage/Sidebar/Sidebar";

import classes from "@/components/pages/LecturePage/LecturePage.module.scss";
import { fetchCourse } from "@/utils/dataFetch";
import { Suspense } from "react";

export default async function Layout({ children, params }) {
  const course = await fetchCourse(params.courseSlug);

  return (
    <Page background="flat">
      <Section
        limit={null}
        className={classes.LectureSection}
        id="lecture-section"
      >
        <div className={classes.LectureSectionSidebar}>
          <Sidebar course={course} />
        </div>
        <div className={classes.LectureSectionContent}>
          <Suspense>{children}</Suspense>
        </div>
      </Section>
    </Page>
  );
}
