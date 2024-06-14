import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";

export const metadata = {
  title: "Dashboard",
  descriptions: "Manage the features of this website.",
};

export default async function Page() {
  return <DashboardPage />;
}
