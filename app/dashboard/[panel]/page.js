import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { getServerSession } from "next-auth";
import { requiresSession, restrictTo } from "@/utils/authentication";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { metadata as parentMetaData } from "../page";

export const metadata = parentMetaData;

export default async function Page({ params }) {
  const session = await getServerSession(options);

  // Restrict to admins only
  requiresSession(session);
  restrictTo(session, ["admin"]);

  return <DashboardPage panel={params.panel} />;
}
