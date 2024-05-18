import AppError from "./AppError";

const rateLimitMap = new Map();

export function rateLimit(req) {
  const ip = req.headers.get("x-forwarded-for") || req.connection.remoteAddress;
  const limit = 10; // Limiting requests per time frame
  const windowMs = 6 * 1000; // Time frame in ms

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return new AppError("You are sending too many requests!", 429);
  }

  ipData.count += 1;
}
