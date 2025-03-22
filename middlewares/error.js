class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Invalid JWT error
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token. Please try again.", 401);
  }

  // JWT Expired error
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Token has expired. Please login again.", 401);
  }

  // Mongoose Cast Error (invalid _id, etc.)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {})
      .map((error) => error.message)
      .join(", ");
    err = new ErrorHandler(messages, 400);
  }

  // Send JSON response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
