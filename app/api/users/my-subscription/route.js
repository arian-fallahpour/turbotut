import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { getBody } from "@/utils/helper";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = routeHandler(
  async function (req, {}) {
    const { user } = req.data;

    // Get customer's subscription
    const subscription = await Subscription.findActive(user._id);
    if (!subscription)
      return new AppError("You do currently have an active subscription", 400);

    // Get stripe subscription
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    // Format subscription data
    const subscriptionData = {
      startsAt: new Date(stripeSubscription.current_period_start * 1000),
      endsAt: new Date(stripeSubscription.current_period_end * 1000),
      cancelsAtPeriodEnd: stripeSubscription.cancel_at_period_end,
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
  {
    requiresSession: true,
  }
);

export const PATCH = routeHandler(
  async function (req) {
    const { user } = req.data;

    // Retrieve user's subscription
    const subscription = await Subscription.findActive(user._id);

    // Filter changes in body
    const body = await getBody(req);

    const filteredChanges = {
      cancel_at_period_end: body.cancelsAtPeriodEnd,
    };

    // Update stripe subscription
    const stripeSubscription = await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      filteredChanges
    );

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: "Changes made!",
        data: {
          subscription: {
            startsAt: new Date(stripeSubscription.current_period_start * 1000),
            endsAt: new Date(stripeSubscription.current_period_end * 1000),
            cancelsAtPeriodEnd: stripeSubscription.cancel_at_period_end,
          },
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
