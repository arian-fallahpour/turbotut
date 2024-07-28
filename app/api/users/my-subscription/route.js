import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = routeHandler(
  async function (req, {}) {
    const { user } = req.data;

    // Get customer's subscription
    const subscription = await Subscription.findActive(user._id);
    if (!subscription) return new AppError("You do not currently have an active subscription", 400);

    // Format subscription data
    const subscriptionData = {
      startsAt: subscription.startsAt,
      endsAt: subscription.endsAt,
      cancelsAtPeriodEnd: subscription.cancelsAtPeriodEnd,
    };

    return NextResponse.json(
      {
        status: "success",
        data: {
          subscription: subscriptionData,
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true }
);

export const PATCH = routeHandler(
  async function (req) {
    const { user, body } = req.data;

    // Retrieve user's subscription
    const subscription = await Subscription.findActive(user._id);

    // If user wants to keep renewing, check if they have a payment method
    if ("cancelsAtPeriodEnd" in body && !body.cancelsAtPeriodEnd) {
      const stripePaymentMethods = await stripe.customers.listPaymentMethods(user.stripeCustomerId);

      if (stripePaymentMethods.data.length === 0)
        return new AppError("Please add a payment method before allowing renewals for your subscription");
    }

    subscription.cancelsAtPeriodEnd = body.cancelsAtPeriodEnd;
    await subscription.save();

    // Filter changes in body
    const filteredChanges = {
      cancel_at_period_end: body.cancelsAtPeriodEnd,
    };

    // Update stripe subscription
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, filteredChanges);

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: "Changes made!",
        data: {
          subscription: {
            startsAt: subscription.startsAt,
            endsAt: subscription.endsAt,
            cancelsAtPeriodEnd: subscription.cancelsAtPeriodEnd,
          },
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true, parseBody: true }
);
