import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { filterPaymentMethods } from "@/utils/database";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const PATCH = routeHandler(
  async function (req, { params }) {
    if (!params.id)
      return new AppError("Please provide the payment method id", 400);

    const { user } = req.data;

    // Update user's default payment method
    const stripeCustomer = await stripe.customers.update(
      user.stripeCustomerId,
      {
        invoice_settings: { default_payment_method: params.id },
      }
    );

    // Get customer's payment methods
    const stripePaymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId
    );

    // Filter payment methods data
    const cards = filterPaymentMethods(stripePaymentMethods, stripeCustomer);

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: "Successfully changed default payment method",
        data: {
          cards,
        },
      },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
