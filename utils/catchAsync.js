import AppError from "./AppError";
import errorHandler from "./errorHandler";

const catchAsync = (fn) => {
  return async function (...args) {
    try {
      const response = await fn(...args);

      // Throw any responses
      if (response instanceof AppError) throw response;

      return response;
    } catch (error) {
      return errorHandler(error);
    }
  };
};
export default catchAsync;
