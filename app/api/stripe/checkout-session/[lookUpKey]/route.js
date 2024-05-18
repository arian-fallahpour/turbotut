import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { getDomain } from "@/utils/dataFetch";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;

    // Check if stripe lookup key is provided
    if (!params.lookUpKey)
      return new AppError("Please provide a price look up key to proceed", 400);

    // Check if user already has an active premium subscription
    const subscription = await Subscription.findOne({
      user: user._id,
      startsAt: { $lt: new Date(Date.now()) },
      endsAt: { $gt: new Date(Date.now()) },
    });
    if (subscription)
      return new AppError("You already have a premium subcription!", 400);

    // Find stripe premium-plan price
    const prices = await stripe.prices.list({
      lookup_keys: [params.lookUpKey],
      expand: ["data.product"],
    });
    const premiumPrice = prices.data[0];

    // Create stripe session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer: user.stripeCustomerId,
      billing_address_collection: "auto",
      line_items: [
        {
          price: premiumPrice.id,
          quantity: 1, // For metered billing, do not pass quantity
        },
      ],
      mode: "subscription",
      subscription_data: {
        metadata: {
          orderType: "subscription", // used for future if needed
          planType: "premium", // used for future if needed
          userId: user._id.toString(), // Used to fulfill request
          userFirstName: user.firstName, // Used for technical support
          userLastName: user.lastName, // Used for technical support
          userEmail: user.email, // Used for technical support
        },
      },
      return_url: `${getDomain()}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Send client secret to response
    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
