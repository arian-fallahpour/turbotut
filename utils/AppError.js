import { NextResponse } from "next/server";

export default class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
