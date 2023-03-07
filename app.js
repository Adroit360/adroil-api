const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./controllers/error_controller");
const AppError = require("./utils/appError");

const authRoute = require("./routes/auth_route");
const userRoute = require("./routes/user_routes");
const leadRoute = require("./routes/lead_route");
const orderRoute = require("./routes/order_route");
const accountRoute = require("./routes/account_route");
const contactRoute = require("./routes/contact_route");
const productRoute = require("./routes/product_route");
const categoryRoute = require("./routes/category_route");
const opportunituesRoute = require("./routes/opportunitiy_routes");

const testRoute = require("./routes/test_route");

// initialize app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", testRoute);

// routes
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", leadRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", accountRoute);
app.use("/api/v1", contactRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", opportunituesRoute);

// handling unhandled routes
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// global error handler middleware
app.use(globalErrorHandler);

module.exports = app;
