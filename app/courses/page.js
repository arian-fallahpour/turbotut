import CoursesPage from "@/components/pages/CoursesPage/CoursesPage";
import Course from "@/models/courseModel";
import { connectDB } from "@/utils/database";

async function getData() {
  await connectDB();

  const courses = await Course.find({ isArchived: false });

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
