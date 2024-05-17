import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { requiresSession, restrictTo } from "@/utils/authentication";

export default async function Page() {
  // Restrict to admins only
  const session = await getServerSession(options);
  requiresSession(session);
  restrictTo(session, ["admin"]);

  return <DashboardPage />;
}
