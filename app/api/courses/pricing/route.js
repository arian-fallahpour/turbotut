import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = routeHandler(async function () {
  const prices = await stripe.prices.list();

  // TODO: finish off
  return NextResponse.json({
    status: "success",
    data: {
      prices,
    },
  });
});
