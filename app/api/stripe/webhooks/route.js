import Order from "@/models/orderModel";
import Subscription from "@/models/subscriptionModel";
import { connectDB } from "@/utils/database";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async function (req, {}) {
  await connectDB();

  // Get stripe data
  const payload = await req.text();
  const sig = headers().get("stripe-signature");

  // Retrieve webhook event
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(event.type);

  // Check if subscription invoice has been paid
  if (event.type === "invoice.paid") {
    const invoice = event.data.object;

    // Retrieve subscription object
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription
    );

    const { userId } = subscription.metadata;

    //  Create order
    const order = await Order.create({ user: userId });

    // Grant user access to premium for the billing cycle
    console.log("Subscription being created/renewed");
    await Subscription.create({
      user: userId,
      order: order._id,
      startsAt: new Date(subscription.current_period_start * 1000),
      endsAt: new Date(subscription.current_period_end * 1000),
    });
  }

  // TODO:  reset   all stripe products and test again
  //        NOTES:  invoice gets payed a around a day after it gets sent,
  //                so there is a period where the user does not get access
  //                to premium between billing cycles

  return new Response(null, { status: 204 });
};
