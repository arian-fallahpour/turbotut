import HomePage from "@/components/pages/HomePage/HomePage";
import business from "@/data/business";

export const metadata = {
  title: business.name,
  description: business.description,
};

export default function Page() {
  return <HomePage />;
}
