import CoursesPage from "@/components/pages/CoursesPage/CoursesPage";
import Course from "@/models/courseModel";
import { connectDB } from "@/utils/database";

async function getData() {
  await connectDB();

  const courses = await Course.find();

  return { courses };
}

export default async function Page() {
  const { courses } = await getData();

  return <CoursesPage courses={courses} />;
}
