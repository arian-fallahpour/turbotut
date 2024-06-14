import LecturePage from "@/components/pages/LecturePage/LecturePage";
import { generateMetadata as parentGenerateMetadata } from "../../page";

export const generateMetadata = parentGenerateMetadata;

export default async function Page({ ...args }) {
  return <LecturePage {...args} />;
}
