import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/");
  // Not doing this rn, making courses first (use API)

  return <DashboardPage />;
}
