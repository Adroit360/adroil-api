const mongoose = require("mongoose");

process.on("oncaughtException", (err) => {
  console.log("Uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});

require("dotenv").config();
const app = require("./app");

// initialize database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// server
app.listen(process.env.PORT || 5500, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});

// global unhamdled rejections
// process.on("unhandledrejection", (err) => {
//   console.log("unhandled rejection");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
