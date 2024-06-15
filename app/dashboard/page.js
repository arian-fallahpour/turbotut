import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  descriptions: "Manage the features of this website.",
};

export default async function Page() {
  return redirect("/dashboard/courses");
}
