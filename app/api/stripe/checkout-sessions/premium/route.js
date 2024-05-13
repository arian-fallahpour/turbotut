import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { routeHandler } from "@/utils/authentication";
import AppError from "@/utils/AppError";

import Subscription from "@/models/subscriptionModel";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = routeHandler(
  async function (req, {}) {
    const { user } = req.data;

    // Check if user already has an active premium subscription
    const subscription = await Subscription.findOne({
      user: user._id,
      startsAt: { $lt: new Date(Date.now()) },
      endsAt: { $gt: new Date(Date.now()) },
    });
    if (subscription)
      return new AppError("You already have a premium subcription!", 400);

    // Find stripe premium product
    const product = await stripe.products.retrieve(
      process.env.STRIPE_PREMIUM_PROD_ID
    );
    if (!product) return new AppError("Could not find pricing plan", 500);

    // Create stripe session
    const protocol = headers().get("x-forwarded-proto");
    const host = headers().get("host");
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: product.default_price, // stripe Price id
          quantity: 1, // Always 1 for premium
        },
      ],
      mode: "subscription",
      metadata: {
        orderType: "subscription",
        purchaseType: "premium",

        userId: user._id.toString(), // Used to fulfill request
        userFirstName: user.firstName, // Used for technical support
        userLastName: user.lastName, // Used for technical support
        userEmail: user.email, // Used for technical support
      },
      return_url: `${protocol}://${host}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Send client secret to response
    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
