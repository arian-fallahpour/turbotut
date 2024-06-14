import ProfilePage from "@/components/pages/ProfilePage/ProfilePage";

export const metadata = {
  title: "Profile",
  description: "Edit and view your profile.",
};

export default async function Page() {
  return <ProfilePage />;
}
