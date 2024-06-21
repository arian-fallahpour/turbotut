import HomePage from "@/components/pages/HomePage/HomePage";
import business from "@/app/data/business";

export const metadata = {
  title: business.name,
  description: business.description,
};

export default function Page() {
  return <HomePage />;
}
