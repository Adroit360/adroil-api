const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    amount: Number,
    location: String,
    refId: String,
    quantity: Number,
    status: {
      type: String,
      enum: ["pending", "on-rute", "complete"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate(["user", "product"]);
  next();
});

module.exports = mongoose.model("Order", orderSchema);
