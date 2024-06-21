import { headers } from "next/headers";

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

  return resData.data.course;
}
