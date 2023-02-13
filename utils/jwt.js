const jwt = require("jsonwebtoken");
const AppError = require("./appError");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return next(new AppError("No token provided", 403));
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.expiredAt < new Date()) {
        return next(new AppError("Token expired. Please login", 403));
      }

      return next(new AppError("Cannot Authenticate token", 400));
    }

    req.user = decoded;
    next();
  });
};
