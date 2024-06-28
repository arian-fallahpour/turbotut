import LecturePage from "@/components/pages/LecturePage/LecturePage";
import { generateMetadata as parentGenerateMetadata } from "../../page";

export const generateMetadata = parentGenerateMetadata;

export default function Page({ ...args }) {
  return <LecturePage {...args} />;
}
