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
