const AppError = require("../utils/appError");

// Bad ID Error
// This will convert mongoose error to a production error that human can read
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
// Dublicate Field Error
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};
// Validation Error
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    return el.message;
  });
  const message = `Invalid input data. ${errors.join(". ")}`;
  // console.log(err);
  return new AppError(message, 400);
};

const sendError = (err, req, res) => {
  // console.log(err);

  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err.message);

  let error = { ...err };
  error.message = err.message;

  sendError(error, req, res);
};
