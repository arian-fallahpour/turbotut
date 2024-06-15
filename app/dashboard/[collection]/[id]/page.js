import DocumentPage from "@/components/pages/dashboard/DocumentPage/DocumentPage";

export default async function Page({ params }) {
  return <DocumentPage collectionName={params.collection} id={params.id} />;
}
