import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { getDomain } from "@/utils/dataFetch";
import { filterPaymentMethods } from "@/utils/database";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Gets all customer's paymentMethods
export const GET = routeHandler(
  async function (req) {
    const { user } = req.data;

    const stripeCustomer = await stripe.customers.retrieve(
      user.stripeCustomerId
    );

    // Get user's stripe payment methods
    const stripePaymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId
    );

    // Filter payment methods data
    const cards = filterPaymentMethods(stripePaymentMethods, stripeCustomer);

    return NextResponse.json(
      {
        status: "success",
        data: {
          cards,
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true }
);

// Creates session to attach new payment method
export const POST = routeHandler(
  async function (req, {}) {
    const { user } = req.data;

    // Get active subscription (not necessary to add card)
    const subscription = await Subscription.findActive(user._id);

    // Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: user.stripeCustomerId,
      setup_intent_data: {
        metadata: {
          customer_id: user.stripeCustomerId,
          subscription_id: subscription ? subscription.id : undefined,
        },
      },
      success_url: `${getDomain()}/profile`,
      cancel_url: `${getDomain()}/profile`,
    });

    // Send session to response
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  },
  { requiresSession: true }
);
