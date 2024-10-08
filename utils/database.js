import mongoose from "mongoose";

// Prevents schema undefined error
import User from "@/models/userModel";

let isConnected = false;

export const connectDB = async () => {
  // Check if already connected
  if (isConnected) {
    if (process.env.NODE_ENV === "development") {
      console.log("<< Database already connected >>");
    }

    return;
  }

  try {
    let uri = process.env.DB_CONNECT;
    uri = uri.replace("<username>", process.env.DB_USER);
    uri = uri.replace("<password>", process.env.DB_PASS);

    // Connect to database
    await mongoose.connect(uri, {
      autoIndex: true,
    });

    isConnected = true;

    if (process.env.NODE_ENV === "development") {
      console.log("<< Database connected >>");
    }
  } catch (err) {
    console.log("DATABASE CONNECTION ERROR: ", err);
  }
};

export const doesObjectIdExist = (Model) =>
  async function (val) {
    const doc = await Model.findById(val).select({ id: 1 });
    return !!doc; // Converts to truth value
  };

export const filterPaymentMethods = (stripePaymentMethods, stripeCustomer) => {
  let defaultCardIndex;
  const cards = stripePaymentMethods.data.map((pm, i) => {
    const isDefault = stripeCustomer.invoice_settings.default_payment_method === pm.id;
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
