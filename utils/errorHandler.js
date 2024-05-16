import { NextResponse } from "next/server";

const errorHandler = (error) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // TODO: Setup proper errors (array based)

  // Log the error into the console
  console.log("ERROR: ", error.message);

  // Send response
  return NextResponse.json(
    {
      status: error.status,
      message: error.message,
      stack: error.stack.split("\n"),
    },
    { status: error.statusCode }
  );
};
export default errorHandler;
