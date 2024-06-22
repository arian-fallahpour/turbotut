import { headers } from "next/headers";

// PREVENTS ERROR
import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
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
  const res = await fetchAuth(`${getDomain()}/api/courses/info/${courseSlug}`);
  const resData = await res.json();

  return JSON.parse(JSON.stringify(resData.data.course));
}
