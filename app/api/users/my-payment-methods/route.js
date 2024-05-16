import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { getDomain } from "@/utils/dataFetch";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = routeHandler(
  async function (req) {
    const { user } = req.data;

    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    console.log(customer);

    // Get user's stripe payment methods
    const paymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId
    );

    const cards = paymentMethods.data.map((pm) => ({
      id: pm.id,
      card: {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expiryMonth: pm.card.exp_month,
        expiryYear: pm.card.exp_year,
        isDefault: customer.invoice_settings.default_payment_method === pm.id,
      },
    }));

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

export const POST = routeHandler(
  async function (req, {}) {
    const { user } = req.data;

    // Get active subscription
    const subscription = await Subscription.findActive(user._id);
    if (!subscription)
      return new AppError(
        "You do not currently have an active subscription",
        400
      );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: user.stripeCustomerId,
      setup_intent_data: {
        metadata: {
          customer_id: user.stripeCustomerId,
          subscription_id: subscription.id,
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
