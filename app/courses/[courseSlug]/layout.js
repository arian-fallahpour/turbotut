import Section from "@/components/Elements/Section/Section";
import Page from "@/components/Elements/Page/Page";
import Sidebar from "@/components/pages/LecturePage/Sidebar/Sidebar";

import classes from "@/components/pages/LecturePage/LecturePage.module.scss";
import { fetchCourse } from "@/utils/dataFetch";
import { Suspense } from "react";
import LoaderBlock from "@/components/Elements/Loader/LoaderBlock";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Layout({ children, params }) {
  const course = await fetchCourse(params.courseSlug);
  const session = await getServerSession(options);

  return (
    <Page background="flat" session={session}>
      <Section limit={null} className={classes.LectureSection} id="lecture-section">
        <Sidebar course={course} session={session} />
        <Suspense fallback={<LoaderBlock />}>{children}</Suspense>
      </Section>
    </Page>
  );
}
