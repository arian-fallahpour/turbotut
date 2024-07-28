import Order from "@/models/orderModel";
import Subscription from "@/models/subscriptionModel";
import { connectDB } from "@/utils/database";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 *
 * FIX:
 * currently, subscriptions are seen as active if endsAt is greater than Date.now()
 * we need to make it so that it is active based on its status
 */

export const POST = async function (req, {}) {
  await connectDB();

  // Get stripe data
  const payload = await req.text();
  const sig = headers().get("stripe-signature");

  // Retrieve webhook event
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // If subscription invoice has been paid, create a new order and subscription
  if (event.type === "invoice.paid") {
    const invoice = event.data.object;

    // Retrieve subscription object
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);

    const { userId } = subscription.metadata;

    // Set the status of the previously active subscription to passed if it exists
    const passedSubscription = await Subscription.findOne({ user: userId, status: "active" });
    if (passedSubscription) {
      passedSubscription.status = "passed"; // NOTE: this webhook does not occur when the subscription is cancelled at period end on stripe
      await passedSubscription.save();
    }

    //  Create an order
    const order = await Order.create({ user: userId }); // Orders can be used universally if course purchases are a thing

    // Grant user access to premium for the billing cycle
    const invoiceDelaySeconds = 60 * 60 * 24 * 2; // Leeway for in between billing cycles
    await Subscription.create({
      user: userId,
      order: order._id,
      startsAt: new Date(subscription.current_period_start * 1000),
      endsAt: new Date((subscription.current_period_end + invoiceDelaySeconds) * 1000),
      stripeSubscriptionId: subscription.id,
    });
  }

  // Set default payment method if one has been attached and there is none already
  if (event.type === "payment_method.attached") {
    const paymentMethod = event.data.object;

    // Find customer
    const customer = await stripe.customers.retrieve(paymentMethod.customer);

    // Set default payment method if doesn't already have it set
    if (!customer.invoice_settings.default_payment_method) {
      await stripe.customers.update(paymentMethod.customer, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
    }
  }

  // Set default payment method if current default method is deleted
  if (event.type === "customer.updated") {
    const customer = event.data.object;

    if (!customer.invoice_settings.default_payment_method) {
      // Find all customer's payment methods
      const paymentMethods = await stripe.customers.listPaymentMethods(customer.id);
      const firstPaymentMethod = paymentMethods.data[0];

      // Set customer's default payment method
      if (firstPaymentMethod) {
        await stripe.customers.update(customer.id, {
          invoice_settings: { default_payment_method: firstPaymentMethod.id },
        });
      }
    }
  }

  // Set subscription's status to cancelled when stripe subscription is cancelled
  if (event.type === "customer.subscription.deleted") {
    const subscription = await Subscription.findOne({ status: "active", stripeSubscriptionId: event.data.object.id });

    if (subscription) {
      subscription.status = "cancelled";
      await subscription.save();
    }
  }

  return new Response(null, { status: 204 });
};
