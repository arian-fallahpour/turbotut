import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "./database";
import Course from "@/models/courseModel";
import Chapter from "@/models/chapterModel";
import Lecture from "@/models/lectureModel";

/** Fetches data with next-auth session in headers */
export async function fetchAuth(url, options = {}) {
  options = {
    headers: options.headers || {},
  };

  return await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      cookie: headers().get("cookie"),
    },
  });
}

export function getDomain() {
  const protocol = headers().get("x-forwarded-proto");
  const host = headers().get("host");
  const domain = `${protocol}://${host}`;

  return domain;
}

export async function fetchCourse(courseSlug) {
  await connectDB();

  // Query course data for sidebar
  const course = await Course.findOne({ slug: courseSlug }).populate({
    path: "chapters",
    select: { name: 1, lectures: 1 },
    populate: {
      path: "lectures",
      select: { name: 1, slug: 1, type: 1 },
    },
  });
  if (!course) redirect("/courses");

  const data = JSON.parse(JSON.stringify(course));

  return data;
}
