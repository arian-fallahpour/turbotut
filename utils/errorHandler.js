import { NextResponse } from "next/server";
import AppError from "./AppError";

const errorHandler = (error) => {
  // error = JSON.parse(JSON.stringify(error));
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // Refactor errors
  if (error.name === "ValidationError") error = handleValidationError(error);
  if (error.code === 11000) error = handleDuplicateFieldError(error);
  if (error.type === "StripeInvalidRequestError") error = handleStripeError(error);

  // Log error if not operational
  if (!error.isOperational) {
    console.error("*** NON-OPERATIONAL ERROR ***: ", error);
  }

  // Send prod error if in production
  if (process.env.NODE_ENV === "production") {
    const message = error.statusCode.toString().startsWith("4") ? error.message : "Internal server error";

    return NextResponse.json(
      {
        status: error.status,
        message,
        errors: error.errors,
      },
      { status: error.statusCode }
    );
  }

  // Send dev error if in development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      {
        status: error.status,
        message: error.message,
        errors: error.errors,
        stack: error.stack.split("\n"),
      },
      { status: error.statusCode }
    );
  }
};

function handleValidationError(error) {
  error.statusCode = 400;
  error.status = "fail";
  error.message = error._message;
  error.isOperational = true;

  Object.values(error.errors).forEach((err) => {
    if (err.name === "CastError") {
      error.errors[err.path] = `Please provide a valid value`;
    } else {
      error.errors[err.path] = err.message;
    }
  });

  return error;
}

function handleDuplicateFieldError(error) {
  const keys = Object.keys(error.keyPattern);
  error.statusCode = 400;
  error.status = "fail";
  error.isOperational = true;

  if (keys.length === 1) {
    error.message = `Provided ${keys[0]} is taken`;
  } else {
    error.message = `Choose a different combination of values for ${keys.slice(0, keys.length - 1).join(", ")} and ${
      keys[keys.length - 1]
    }`;
  }

  error.errors = {};
  keys.forEach((key) => {
    error.errors[key] = "Please provide a different value";
  });

  return error;
}

function handleStripeError(error) {
  console.error(error.raw);
  if (error.raw.code === "resource_missing") {
    return new AppError("Please provide a valid and existing id", 400);
  }

  return error;
}

export default errorHandler;
