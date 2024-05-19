import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { filterPaymentMethods } from "@/utils/database";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Detach
export const DELETE = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;
    if (!params.id)
      return new AppError("Please provide a paymentMethod id", 400);

    // Detach payment method in stripe
    await stripe.paymentMethods.detach(params.id);

    // Retrieve payment methods
    const stripeCustomer = await stripe.customers.retrieve(
      user.stripeCustomerId
    );
    const stripePaymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId
    );

    // If no more payment methods, cancel subscription
    if (stripePaymentMethods.data.length === 0) {
      // Find subscription and cancel it in stripe
      const subscription = await Subscription.findActive(user._id);
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    const cards = filterPaymentMethods(stripePaymentMethods, stripeCustomer);

    // Return 204 no content
    return NextResponse.json(
      {
        status: "sucess",
        message: "successfully deleted payment method",
        data: {
          cards,
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
