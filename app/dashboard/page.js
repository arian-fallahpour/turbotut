import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { requiresSession, restrictTo } from "@/utils/authentication";
import { BASE_URL } from "@/utils/config";
import { fetchAuth } from "@/utils/dataFetch";

// TODO: Fix this
const getData = async () => {
  try {
    const res = await fetchAuth(`${BASE_URL}/api/users`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("ERROR HAPPENED");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default async function Page() {
  // Restrict to admins only
  const session = await getServerSession(options);
  requiresSession(session);
  restrictTo(session, ["admin"]);

  // Get dashboard data
  const data = await getData();

  return <DashboardPage />;
}
