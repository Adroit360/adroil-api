const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./controllers/error_controller");
const AppError = require("./utils/appError");

const authRoute = require("./routes/auth_route");
const userRoute = require("./routes/user_routes");
const leadRoute = require("./routes/lead_route");

// initialize app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", leadRoute);

// handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler middleware
app.use(globalErrorHandler);

module.exports = app;
