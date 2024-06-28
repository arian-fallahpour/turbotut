import LecturePage from "@/components/pages/LecturePage/LecturePage";
import { capitalize } from "@/utils/helper";

export function generateMetadata({ params, searchParams }) {
  return {
    title: capitalize(params.courseSlug.split("-").join(" ")),
  };
}

export default function Page({ ...args }) {
  return <LecturePage {...args} isOverview />;
}
