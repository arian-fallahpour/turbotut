import mongoose from "mongoose";
import catchAsync from "./catchAsync";
import User from "@/models/userModel";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    if (process.env.NODE_ENV === "development") {
      console.log("<< Database already connected >>");
    }

    return;
  }

  try {
    const uri = process.env.DB_CONNECT.replace(
      "<password>",
      process.env.DB_PASS
    );
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    isConnected = true;
    console.log("<< Database connected >>");
  } catch (err) {
    console.log(err);
  }
};

export const signupUpdateUser = catchAsync(
  async ({ firstName, lastName, email, picture }) => {
    await connectDB();

    let user = await User.findOne({ email });

    // If user exists, update current one
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.picture = picture;
      await user.save();
    }

    // If user does not exist, create a new one
    else {
      user = await User.create({
        firstName,
        lastName,
        email,
        picture,
      });
    }

    return user;
  }
);

export const isValidObjectId = (Model) =>
  async function (val) {
    const doc = await Model.findById(val).select({ id: 1 });
    return !!doc; // Converts to truth value
  };

export const filterPaymentMethods = (stripePaymentMethods, stripeCustomer) => {
  let defaultCardIndex;
  const cards = stripePaymentMethods.data.map((pm, i) => {
    const isDefault =
      stripeCustomer.invoice_settings.default_payment_method === pm.id;
    if (isDefault) defaultCardIndex = i;

    return {
      id: pm.id,
      card: {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expiryMonth: pm.card.exp_month,
        expiryYear: pm.card.exp_year,
        isDefault,
      },
    };
  });

  // Make default card first one in list
  if (cards.length > 1) {
    const defaultCard = cards[defaultCardIndex];
    cards.splice(defaultCardIndex, 1);
    cards.unshift(defaultCard);
  }

  return cards;
};
