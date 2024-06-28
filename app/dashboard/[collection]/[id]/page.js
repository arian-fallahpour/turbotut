import DocumentPage from "@/components/pages/dashboard/DocumentPage/DocumentPage";
import { metadata as parentMetaData } from "../page";

export const metadata = parentMetaData;

export default async function Page({ params }) {
  return <DocumentPage collectionName={params.collection} id={params.id} />;
}
