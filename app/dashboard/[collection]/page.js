import CollectionPage from "@/components/pages/dashboard/CollectionPage/CollectionPage";
import { metadata as parentMetaData } from "../page";

export const metadata = parentMetaData;

export default async function Page({ params, searchParams }) {
  return (
    <CollectionPage
      collectionName={params.collection}
      searchParams={searchParams}
    />
  );
}
