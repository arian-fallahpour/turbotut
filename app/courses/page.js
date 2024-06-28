import CoursesPage from "@/components/pages/CoursesPage/CoursesPage";
import Course from "@/models/courseModel";
import APIQuery from "@/utils/APIQuery";
import { connectDB } from "@/utils/database";

async function getData() {
  await connectDB();

  const query = new APIQuery(Course.find(), { isArchived: false }).sort();
  const courses = await query.execute();

  return { courses: JSON.parse(JSON.stringify(courses)) };
}

export const metadata = {
  title: "Courses",
  descriptions: "View all of the courses we offer.",
};

export default async function Page() {
  const { courses } = await getData();

  return <CoursesPage courses={courses} />;
}
