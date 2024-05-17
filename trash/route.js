import Order from "@/models/orderModel";
import Subscription from "@/models/subscriptionModel";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async function (req, res) {
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
    await Subscription.create({
      user: userId,
      order: order._id,
      startsAt: new Date(subscription.current_period_start * 1000),
      endsAt: new Date(subscription.current_period_end * 1000),
    });
  }

  // if (event.type === "checkout.session.completed") {
  //   // Get session
  //   const session = await stripe.checkout.sessions.retrieve(
  //     event.data.object.id
  //   );

  //   const { orderType } = session.metadata;

  //   // Update subscription object with metadata
  //   if (orderType === "subscription") {
  //     await stripe.subscriptions.update(session.subscription, {
  //       metadata: session.matadata,
  //     });
  //   }
  // }

  // Fulfill order
  if (event.type === "checkout.session.completed") {
    // // Retrieve session
    // const session = await stripe.checkout.sessions.retrieve(
    //   event.data.object.id,
    //   { expand: ["line_items", "line_items.data.price.product"] }
    // );
    // const { orderType, purchaseType, userId } = session.metadata;
    // const lineItems = session.line_items;
    // // Create Order with correct type
    // const order = await Order.create({
    //   type: orderType,
    //   user: userId,
    // });
    // // Create a Purchase document to grant user access to course
    // if (purchaseType === "course") {
    //   const { courseId } = lineItems.data[0].price.product.metadata; // Always only 1 line item currently for one-course purchases
    //   await Purchase.create({
    //     user: userId,
    //     order: order._id,
    //     course: courseId,
    //   });
    // }
    // Create a Subscription document to grant user access to premium
    // if (purchaseType === "premium") {
    //   await Subscription.create({
    //     user: userId,
    //     order: order._id,
    //     // Start and end dates are automatically created via default values for now
    //   });
    // }
  }

  return new Response(null, { status: 204 });
};
