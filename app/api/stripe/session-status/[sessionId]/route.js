import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = routeHandler(async function (req, { params }) {
  if (!params.sessionId)
    return new AppError("Please provide a session id", 400);

  const session = await stripe.checkout.sessions.retrieve(params.sessionId);
  if (!session)
    return new AppError("Could not find session with provided id", 404);

  return NextResponse.json({
    status: "success",
    data: {
      sessionStatus: session.status,
      paymentStatus: session.payment_status,
    },
  });
});
