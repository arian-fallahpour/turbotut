import CheckoutPage from "@/components/pages/CheckoutPage/CheckoutPage";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { requiresSession } from "@/utils/authentication";

export default async function Page() {
  const session = await getServerSession(options);
  requiresSession(session);

  return <CheckoutPage />;
}
