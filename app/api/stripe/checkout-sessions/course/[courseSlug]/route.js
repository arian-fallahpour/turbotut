import { headers } from "next/headers";
import { NextResponse } from "next/server";

import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";

import Purchase from "@/models/purchaseModel";
import Course from "@/models/courseModel";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;

    // Find course
    const { courseSlug } = params;
    const course = await Course.findOne({ slug: courseSlug }).select({
      slug: 1,
      stripeProductId: 1,
    });
    if (!course) return new AppError("Course not found, please try again", 404);
    if (!course.stripeProductId)
      return new AppError(
        "Course does not have price associated with it, contact support to help with this issue",
        400
      );

    // Check if user already purchased course
    const purchase = await Purchase.findOne({
      user: user._id,
      course: course._id,
    });
    if (purchase) return new AppError("You already bought this course", 400);

    // Find stripe product
    const product = await stripe.products.retrieve(course.stripeProductId);
    if (!product)
      return new AppError(
        "Course does not have price associated with it, contact support to help with this issue",
        400
      );

    // Create stripe session
    const protocol = headers().get("x-forwarded-proto");
    const host = headers().get("host");
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: product.default_price, // stripe Price id
          quantity: 1, // Always 1 for one-course option
        },
      ],
      mode: "payment",
      metadata: {
        orderType: "purchase",
        purchaseType: "course",

        courseId: course._id.toString(), // Used to fullfill request
        userId: user._id.toString(), // Used to fulfill request
        userFirstName: user.firstName, // Used for technical support
        userLastName: user.lastName, // Used for technical support
        userEmail: user.email, // Used for technical support
      },
      return_url: `${protocol}://${host}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Send client secret to response
    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 }
    );
  },
  { requiresSession: true }
);
