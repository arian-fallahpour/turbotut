import Subscription from "@/models/subscriptionModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Detach
export const DELETE = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;

    if (!params.id)
      return new AppError("Please provide a paymentMethod id", 400);

    // Find active subscription
    const subscription = await Subscription.findActive(user._id);

    // Do not bill subscription at period end on stripe
    if (subscription) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }
    // TODO: What if the user updates their subscription to renew, but does not have a card?

    // Detach payment method in stripe
    await stripe.paymentMethods.detach(params.id);

    // Return 204 no content
    return new Response(null, { status: 204 });
  },
  { requiresSession: true }
);
