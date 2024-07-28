import React from "react";
import ReturnPage from "@/components/pages/ReturnPage/ReturnPage";

export default async function Page({ searchParams }) {
  return <ReturnPage searchParams={searchParams} />;
}
